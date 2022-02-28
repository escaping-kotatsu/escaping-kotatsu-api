'use strict';

import L from '../utils/logger';
import { Request, Response, NextFunction } from 'express';
import { SESSION_SECRET, COOKIE_OPTIONS } from '../constants/constant';
import { UserModel } from '../db/model/user.model';

const userModel = new UserModel();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!('session' in req.cookies)) {
    res.status(401).json({ message: 'could u set secret?' });
    return;
  }

  try {
    const user = await userModel.getBySession(req.cookies['session']);

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

export const loginAPI = (req: Request, res: Response): void => {
  res.cookie('session', 'aaa', COOKIE_OPTIONS).json({ message: 'login successful' });
};
