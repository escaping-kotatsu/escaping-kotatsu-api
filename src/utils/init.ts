import { FIRST_USER_NAME, FIRST_USER_PASS } from '../constants/constant';
import { UserModel } from '../db/model/user.model';
const userModel = new UserModel();

export const init = async () => {
  const exist = await userModel.userExist(FIRST_USER_NAME, FIRST_USER_PASS);
  if (!exist) {
    await userModel.add(FIRST_USER_NAME, FIRST_USER_PASS);
  }
}
