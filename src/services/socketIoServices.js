const { Server } = require('socket.io');

class SocketIoServices {
  io;

  init(server) {
    this.io = new Server(server, {
      cors: {
        origin: 'http://localhost:3005',
      },
    });
  }

  send(data) {
    this.io.emit('message', data);
  }
}

module.exports = new SocketIoServices();
