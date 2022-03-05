'use strict';

import { Router } from 'express';

export const iotRouter = Router();

iotRouter.get('/kotatsu/:id/status', (req, res) => {
  res.json({
    pulling: true,
    pull_timer: 5,
    pull_time: 'unix-time',
  });
});
