const redis = require('redis');

const client = redis.createClient({
  password: 'v3vFJ4458MhNNS2iNwqH0ESTQhoJUgpJ',
  socket: {
    host: 'redis-12043.c293.eu-central-1-1.ec2.cloud.redislabs.com',
    port: 12043,
  },
});

class RedisServices {
  client = client;

  async init() {
    try {
      await client.connect();
    } catch (error) {
      throw error;
    }
  }

  async hSet(hashKey, field, value) {
    if (typeof value !== 'string') {
      return await this.client.hSet(hashKey, field, JSON.stringify(value));
    }
    return await this.client.hSet(hashKey, field, value);
  }

  async hGet(hashKey, field) {
    return await this.client.hGet(hashKey, field);
  }

  async hDelete(hashKey, field) {
    return await this.client.hDel(hashKey, field);
  }

  async hGetAll(hashKey) {
    return await this.client.hGetAll(hashKey);
  }

  async getAllKeys() {
    return await this.client.keys('*');
  }

  async hDeleteAllByKey(hashKey) {
    const fields = await this.client.hKeys(hashKey);
    return await this.client.hDel(hashKey, fields);
  }
}

module.exports = new RedisServices();
