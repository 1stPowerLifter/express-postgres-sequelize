const app = require('./app');
const { sequelize } = require('./models');
const { RedisServices, PushNotificationServices } = require('./services');
const { PORT = 8080 } = process.env;
const ws = PushNotificationServices.get();

(async () => {
  try {
    await sequelize.authenticate();
    await RedisServices.init();
    const server = app.listen(PORT);
    ws.init(server);
  } catch (error) {
    throw error;
  }
})();
