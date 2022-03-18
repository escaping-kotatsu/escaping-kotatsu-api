'use strict';

import L from '../utils/logger';
import { Request, Response, NextFunction } from 'express';
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
