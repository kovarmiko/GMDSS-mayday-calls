import WebSocket from 'ws';
import {
  ClientsMessage,
  ConnectionMessage,
  MessageType,
} from './src/app/types/types';
const port = 8080;
const wss = new WebSocket.Server({ port });

const clients = new Set<Omit<ConnectionMessage, 'type'>>();

console.log(
  `WebSocket server is now running on ${JSON.stringify(wss.address())}`
);

wss.on('connection', function connection(ws) {
  console.log('A new client connected.');
  ws.on('error', console.error);

  ws.on('open', function open() {
    ws.send('Hi I have joined');
  });

  ws.on('close', function close() {
    clients.clear();
  });

  ws.on('message', function message(rawData: WebSocket.RawData) {
    console.log('received: %s', rawData);
    const message = JSON.parse(rawData.toString()) as MessageType;
    console.log(message);

    if (typeof message === 'string') {
      console.log(message, 'inside string condition');
      ws.send(JSON.stringify({ string: message }));
      return;
    }

    if ('type' in message) {
      switch (message.type) {
        case 'connect':
          clients.add({
            boatCallSign: message.boatCallSign,
            deviceName: message.deviceName,
          });
          messageClientList(ws);

          break;
        case 'disconnect':
          deleteClientByCallSign(message.boatCallSign);
          messageClientList(ws);
          break;
        case 'rename':
          deleteClientByCallSign(message.old.boatCallSign);
          clients.add({
            boatCallSign: message.boatCallSign,
            deviceName: message.deviceName,
          });
          messageClientList(ws);
          break;
        case 'transmission':
          broadcast(JSON.stringify(message));
          break;
        default:
          break;
      }
    }
  });

  ws.on('close', () => {
    // Broadcast the updated client list size
    ws.send(
      JSON.stringify({
        message: `A client has disconnected. Total clients: ${clients.size}`,
      })
    );
  });
});

function messageClientList(ws: WebSocket) {
  const message: ClientsMessage = {
    clients: Array.from(clients),
    type: 'client',
  };
  const stringifiedMessage = JSON.stringify(message);
  console.log(`Sending connected clients message ${stringifiedMessage}`);
  broadcast(stringifiedMessage);
}

function broadcast(message: string) {
  wss.clients.forEach((ws) => {
    ws.send(message);
  });
}

function deleteClientByCallSign(callSign: string) {
  clients.forEach((c) => (c.boatCallSign === callSign ? clients.delete(c) : c));
}
