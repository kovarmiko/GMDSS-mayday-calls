import WebSocket from 'ws';
import {
  Client,
  ClientsMessage,
  MessageType,
  RenameMessage,
} from './src/app/types/types';
const port = 8080;
const wss = new WebSocket.Server({ port });

let clients = new Set<Client>();

console.log(
  `WebSocket server is now running on ${JSON.stringify(wss.address())}`
);

wss.on('connection', function connection(ws) {
  console.log('A new client connected.');
  ws.on('error', console.error);

  ws.on('message', function message(rawData: WebSocket.RawData) {
    console.log('received: %s', rawData);
    const message = JSON.parse(rawData.toString());

    if (typeof message === 'string') {
      console.log(message, 'inside string condition');
      ws.send(JSON.stringify({ string: message }));
      return;
    }

    if ('type' in message) {
      switch (message.type) {
        case 'connect':
          clients.add({
            callSign: message.callSign,
            deviceName: message.deviceName,
          });
          messageClientList(ws);

          break;
        case 'disconnect':
          deleteClientByCallSign(message.callSign);
          messageClientList(ws);
          broadcast(message);
          break;
        case 'rename':
          clients = updateItemInClientSet(message);
          messageClientList(ws);
          break;
        case 'transmission':
          broadcast(message);
          break;
        default:
          break;
      }
    }
  });

  ws.on('close', () => {
    ws.send(
      JSON.stringify({
        message: `A client has disconnected. Total clients: ${clients.size}`,
      })
    );
    if (wss.clients.size === 0) {
      clients.clear();
    }
  });
});

function messageClientList(ws: WebSocket) {
  const message: ClientsMessage = {
    clients: Array.from(clients),
    type: 'client',
  };
  console.log(`Sending connected clients message ${message}`);
  broadcast(message);
}

function broadcast(message: MessageType) {
  wss.clients.forEach((ws) => {
    ws.send(JSON.stringify(message));
  });
}

function deleteClientByCallSign(callSign: string) {
  clients.forEach((c) => (c.callSign === callSign ? clients.delete(c) : c));
}

function updateItemInClientSet(message: RenameMessage) {
  const updatedSet = new Set<Client>();

  clients.forEach((item) => {
    if (
      item.callSign === message.old.callSign &&
      item.deviceName === message.old.deviceName
    ) {
      updatedSet.add({
        callSign: message.callSign,
        deviceName: message.deviceName,
      });
    } else {
      updatedSet.add(item);
    }
  });

  return updatedSet;
}
