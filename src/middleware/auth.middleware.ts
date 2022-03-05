'use strict';

import L from '../utils/logger';
import { Request, Response, NextFunction } from 'express';
import { COOKIE_OPTIONS } from '../constants/constant';
import { UserModel } from '../../db/models/user.model';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  new UserModel();

  if (!('session' in req.cookies)) {
    res.status(401).json({ message: 'could u set secret?' });
    return;
  }

  try {
    // const user = await userModel.getBySession(req.cookies['session']);
    const user = { name: 'aaa' };

    if (!user) {
      res.status(401).json({ message: 'invalid session' });
      return;
    }

    res.locals.user = user;
  } catch (err) {
    L.error(err);
    res.status(500).json({ message: 'internal error' });
    return;
  }

  next();
};

export const loginAPI = async (req: Request, res: Response) => {
  // const hitUser = await userModel.getByAuthInfo(req.body.name, req.body.pass);
  const hitUser = { name: 'aaa' }

  if (hitUser) {
    // const sessionUuid = await userModel.enableSession(req.body.name);
    const sessionUuid = 'aaa';
    res.cookie('session', sessionUuid, COOKIE_OPTIONS).json({ message: 'login successful' });
  } else {
    res.send('user not found');
  }
};
