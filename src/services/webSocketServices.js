const WebSocket = require('ws');

class WebSocketServices {
  wss;

  init(server) {
    this.wss = new WebSocket.Server({ server });
    this.wss.on('connection', function connection(ws) {
      ws.on('error', console.error);
    });
  }

  send(data) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
}

module.exports = new WebSocketServices();
