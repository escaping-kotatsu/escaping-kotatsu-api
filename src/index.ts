'use strict';

import L from './utils/logger';
import os from 'os';
import http from 'http';
import express from 'express';
import proxy from 'express-http-proxy';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';

import {
  PORT,
  SESSION_SECRET,
  COOKIE_OPTIONS,
  DATABASE_URL_DEV,
  DATABASE_URL,
  STATIC_VUE_SERVER,
} from './constants/constant';
import { authMiddleware, loginAPI } from './middleware/auth.middleware';
import { init } from './utils/init';
import { iotRouter } from './router/iot';
import { userRouter } from './router/user';

createConnection().then(async () => {
  await init();
  const app = express();

  app.set('appPath', `${__dirname}client`);
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Cross-Origin-Resource-Policy', 'same-origin');
    res.header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.header('X-Content-Type-Options', 'nosniff');
    next();
  });
  if (DATABASE_URL !== DATABASE_URL_DEV) {
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'", 'https://cdn.jsdelivr.net', 'https://fonts.gstatic.com'],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'", "'unsafe-eval'", 'https://storage.googleapis.com'],
          styleSrcElem: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdn.jsdelivr.net'],
          imgSrc: ["'self'"],
          iframeSrc: ["'self'"],
        },
      })
    );
  }
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  // app.use(helmet.hsts()); // use reverse proxy with https
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());

  app.use(morgan('common'));

  app.set('trust proxy', 1);
  app.use(cookieParser(SESSION_SECRET));
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: COOKIE_OPTIONS,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post('/login', loginAPI);
  app.use('/iot', iotRouter);
  app.use('/api', authMiddleware);
  app.use('/api/user', userRouter);

  if (DATABASE_URL !== DATABASE_URL_DEV) {
    app.use('/', proxy(STATIC_VUE_SERVER));
  }

  const welcome = (p: number) => (): void => L.info(`up and running @: ${os.hostname()} on port: ${p}}`);
  http.createServer(app).listen(PORT, welcome(PORT));
});
