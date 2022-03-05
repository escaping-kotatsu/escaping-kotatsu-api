'use strict';

import L from '../utils/logger';
import { Request, Response, NextFunction } from 'express';
import { COOKIE_OPTIONS } from '../constants/constant';
import { UserService } from '../service/user.service';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userService = new UserService();

  if (!('session' in req.cookies)) {
    res.status(401).json({ message: 'could u set secret?' });
    return;
  }

  try {
    const user = await userService.getBySession(req.cookies['session']);

    if (!user) {
      res.status(401).json({ message: 'invalid session' });
      return;
    }

    delete user.hash;
    delete user.session;
    res.locals.user = user;
  } catch (err) {
    L.error(err);
    res.status(500).json({ message: 'internal error' });
    return;
  }

  next();
};

export const loginAPI = async (req: Request, res: Response) => {
  const userService = new UserService();
  const hitUser = await userService.getByAuthInfo(req.body.name, req.body.pass);

  if (hitUser) {
    const sessionUuid = await userService.enableSession(hitUser);
    res.cookie('session', sessionUuid, COOKIE_OPTIONS).json({ message: 'login successful' });
  } else {
    res.status(404).send({ message: 'user not found' });
  }
};
