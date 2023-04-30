require('dotenv').config();
const { parse } = require('pg-connection-string');
const {
  DATABASE_URL = '',
  DB_PASS = 'postgres',
  DB_HOST = 'localhost',
  DB_NAME = 'test',
  DB_DIALECT = 'postgres',
  DB_PORT = 5432,
  DB_PROTOCOL = 'postgres',
  DB_USERNAME = 'postgres',
} = process.env;
const pgConfig = parse(DATABASE_URL);

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    protocol: DB_PROTOCOL,
  },
  production: {
    username: pgConfig.user,
    password: pgConfig.password,
    database: pgConfig.database,
    host: pgConfig.host,
    port: pgConfig.port,
    dialect: DB_DIALECT,
    protocol: DB_PROTOCOL,
    dialectOptions: {
      ssl: false,
    },
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    protocol: DB_PROTOCOL,
  },
};
