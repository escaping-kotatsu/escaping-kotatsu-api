'use strict';

import { Request, Response } from 'express';
import { COOKIE_OPTIONS } from '../constants/constant';
import { UserService } from '../service/user.service';

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
