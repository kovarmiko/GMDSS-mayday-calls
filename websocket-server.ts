import WebSocket from 'ws';
const port = 8080;
const wss = new WebSocket.Server({ port });

const clients = new Set<WebSocket>();

console.log(
  `WebSocket server is now running on ${JSON.stringify(wss.address())}`
);

wss.on('connection', function connection(ws) {
  console.log('A new client connected.');
  clients.add(ws);

  ws.on('error', console.error);

  ws.on('open', function open() {
    ws.send('Hi I have joined');
  });

  ws.on('message', function message(message: WebSocket.RawData) {
    console.log('received: %s', message);
    ws.send(message.toString());
  });

  ws.on('close', () => {
    // Remove the disconnected client from the list
    clients.delete(ws);
    console.log('A client disconnected. Total clients:', clients.size);
    // Broadcast the updated client list size
    broadcast(`A client has disconnected. Total clients: ${clients.size}`);
  });
});

function broadcast(message: string) {
  for (let client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}
