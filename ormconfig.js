'use strict';

const { REGISTER_INSTANCE } = require('ts-node');

module.exports = {
  type: 'postgres',
  synchronize: true,
  entities: [
    process[REGISTER_INSTANCE] ? './src/db/entities/*.entity.ts' : `${__dirname}/dist/src/db/entities/*.entity.js`,
  ],
  migrations: [process[REGISTER_INSTANCE] ? './src/db/migrations/*.ts' : `${__dirname}/dist/src/db/migrations/*.js`],
  subscribers: [process[REGISTER_INSTANCE] ? './src/db/subscribers/*.ts' : `${__dirname}/dist/src/db/subscribers/*.js`],
  url: process.env.DATABASE_URL,
};
