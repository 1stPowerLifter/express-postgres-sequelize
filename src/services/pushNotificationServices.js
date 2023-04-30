const WebSocketServices = require('./webSocketServices');
const SocketIoServices = require('./socketIoServices');

const { PUSH_NOTIFICATION = '' } = process.env;

class PushNotificationServices {
  get() {
    switch (PUSH_NOTIFICATION) {
      case 'IO':
        return SocketIoServices;
      case 'WS':
        return WebSocketServices;
      default:
        break;
    }
    const error = new Error('Push notification is not selected');
    error.status = 500;
    throw error;
  }

  selected = () => PUSH_NOTIFICATION;
}

module.exports = new PushNotificationServices();
