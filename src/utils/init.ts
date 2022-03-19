'use strict';

import L from './logger';
import { FIRST_USER_NAME, FIRST_USER_PASS, FIRST_USER_BLE } from '../constants/constant';
import { UserService } from '../service/user.service';
import { KotatsuService } from '../service/kotatsu.service';

const initUser = async () => {
  const userService = new UserService();
  const user = await userService.getByAuthInfo(FIRST_USER_NAME, FIRST_USER_PASS);
  if (!user) {
    L.info('init: demo user');
    await userService.add(FIRST_USER_NAME, FIRST_USER_PASS, FIRST_USER_BLE);
    return;
  }
  L.info('demo user is exists');
};

const initKotatsu = async () => {
  const kotatsuService = new KotatsuService();
  const kotatsu = await kotatsuService.getById(1);
  if (!kotatsu) {
    L.info('init: demo kotatsu');
    await kotatsuService.add();
    return;
  }
  L.info('demo kotatsu is exists');
};

export const init = async () => {
  await initUser();
  await initKotatsu();
};
