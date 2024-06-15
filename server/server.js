const WebSocket = require('ws');

// Create a WebSocket server instance
const wss = new WebSocket.Server({ port: 3001 });

const sessions = new Set();

// Event listener for when a client connects
wss.on('connection', function connection(ws) {
  console.log('A new client connected');
  sessions.add(ws);

  // Event listener for when a client sends a message
  ws.on('message', function incoming(data) {
    const message = data.toString();
    console.log('Received:', message);

    // Send message to all other clients
    sessions.forEach((s) => {
      if (s !== ws) {
        s.send(message);
      }
    });
  });

  // Event listener for when a client disconnects
  ws.on('close', function close() {
    console.log('Client disconnected');
    sessions.delete(ws);
  });
});

console.log('WebSocket server ready');
