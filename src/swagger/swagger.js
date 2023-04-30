const swaggerAutogen = require('swagger-autogen')();
const doc = require('./doc');

const outputFile = './src/swagger/swagger.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
