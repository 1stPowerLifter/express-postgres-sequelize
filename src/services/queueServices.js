const { Queue, Worker } = require('bullmq');

class QueueServises {
  createNewQueue(name, callback) {
    const queue = new Queue(name, {
      connection: {
        host: 'redis-12043.c293.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 12043,
        password: 'v3vFJ4458MhNNS2iNwqH0ESTQhoJUgpJ',
      },
    });
    const worker = new Worker(name, callback, {
      connection: {
        host: 'redis-12043.c293.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 12043,
        password: 'v3vFJ4458MhNNS2iNwqH0ESTQhoJUgpJ',
      },
      removeOnComplete: {
        age: 3600,
        count: 1000,
      },
      removeOnFail: {
        age: 24 * 3600,
      },
    });
    return queue;
  }
}

module.exports = new QueueServises();
