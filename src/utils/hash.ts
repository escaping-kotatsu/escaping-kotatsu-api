import bcrypt from 'bcrypt';
import { HASH_SECRET } from '../constants/constant';

export const hash = (pass: string): string => {
  return bcrypt.hashSync(pass + HASH_SECRET, 10);
}

export const hashCompare = (pass: string, hash: string): boolean => {
  return !!bcrypt.compareSync(pass + HASH_SECRET, hash);
}