'use strict';

import { Router } from 'express';
import { UserService } from '../service/user.service';
import { KotatsuService } from '../service/kotatsu.service';

export const userRouter = Router();

let userService: UserService = null;
let kotatsuService: KotatsuService = null;

const initService = (): void => {
  if (userService) {
    return;
  }
  userService = new UserService();

  if (kotatsuService) {
    return;
  }
  kotatsuService = new KotatsuService();
};

userRouter.get('/info', async (req, res) => {
  initService();
  res.send(res.locals.user);
});

userRouter.post('/update/config/:id/:pullTime/:pullTimer', async (req, res) => {
  initService();
  if (req.params.id.match(/[^\d]/) || req.params.pullTime.match(/[^\d]/) || req.params.pullTimer.match(/[^\d]/)) {
    res.status(400).json({
      error: 'Invalid: kotatsu id, pullTime, pullTimer is number',
    });
    return;
  }
  await kotatsuService.updateConfig(
    parseInt(req.params.id),
    parseInt(req.params.pullTime),
    parseInt(req.params.pullTimer)
  );
  res.send({ message: 'received request' });
});

userRouter.post('/pulling/toggle/:id', async (req, res) => {
  initService();
  if (req.params.id.match(/[^\d]/)) {
    res.status(400).json({
      error: 'Invalid: kotatsu id is number',
    });
    return;
  }
  const status = await kotatsuService.togglePulling(parseInt(req.params.id));
  res.send({ message: 'received request', pulling: status.pulling });
});
