// 'use strict';

// import L from './logger';
// import { FIRST_USER_NAME, FIRST_USER_PASS } from '../constants/constant';
// import { userModel } from '../model/user.model';
// // import { KotatsuModel } from '../db/model/kotatsu.model';
// // const kotatsuModel = new KotatsuModel();

// const initUser = async () => {
//   const user = await userModel.getByAuthInfo(FIRST_USER_NAME, FIRST_USER_PASS);
//   if (!user) {
//     L.info('init: demo user');
//     await userModel.add(FIRST_USER_NAME, FIRST_USER_PASS);
//     return;
//   }
//   L.info('demo user is exists');
// };

// // const initKotatsu = async () => {
// //   const kotatsu = await kotatsuModel.kotatsuById(1);
// //   if (!kotatsu) {
// //     L.info('init: demo kotatsu');
// //     await kotatsuModel.add();
// //     return;
// //   }
// //   L.info('demo kotatsu is exists');
// // };

export const init = async () => {
  //   initUser();
  //   //  initKotatsu();
};
