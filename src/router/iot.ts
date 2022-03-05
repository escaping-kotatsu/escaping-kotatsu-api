'use strict';

import humps from 'humps';
import { Router } from 'express';
import { KotatsuService } from '../service/kotatsu.service';

export const iotRouter = Router();

let kotatsuService: KotatsuService = null;

const initService = (): void => {
  if (kotatsuService) {
    return;
  }
  kotatsuService = new KotatsuService();
};

iotRouter.get('/kotatsu/:id/status', async (req, res) => {
  initService();
  if (req.params.id.match(/[^\d]/)) {
    res.status(400).json({
      error: 'Invalid: kotatsu id is number',
    });
    return;
  }
  const kotatsu = await kotatsuService.getById(parseInt(req.params.id));
  if (!kotatsu) {
    res.status(404).json({
      error: 'this kotatsu is not found',
    });
  }
  res.json(humps.decamelizeKeys(kotatsu));
});
