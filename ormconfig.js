'use strict';

const { REGISTER_INSTANCE } = require('ts-node');

module.exports = {
  type: 'postgres',
  synchronize: true,
  entities: [process[REGISTER_INSTANCE] ? './db/entities/*.entity.ts' : './dist/db/entities/*.entity.js'],
  migrations: [process[REGISTER_INSTANCE] ? './db/migrations/*.ts' : './dist/db/migrations/*.js'],
  subscribers: [process[REGISTER_INSTANCE] ? './db/subscribers/*.ts' : './dist/db/subscribers/*.js'],
  url: process.env.DATABASE_URL,
};
