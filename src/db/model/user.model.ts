'use strict';

import { User } from '@prisma/client';
import { Model } from './_model';
import { hash, hashCompare } from '../../utils/hash'
import { SESSION_SECRET } from '../../constants/constant';
import { v4 as uuidV4,  v5 as uuidV5 } from 'uuid'

export class UserModel extends Model {
  public async getBySession(session: string): Promise<User> {
    return await this.client.user.findUnique({
      where: {
        session,
      },
    });
  }

  public async enableSession(name: string): Promise<string> {
    const session = uuidV5(name + SESSION_SECRET, uuidV4());
    this.client.user.update({
      where: { name },
      data: { session }
    })
    return session;
  }

  public async add(name: string, pass:string): Promise<User> {
    const hashStr = hash(pass);
    return await this.client.user.create({
      data: {name, hash: hashStr}
    });
  };

  public async userExist(name: string, pass: string): Promise<User> {
    const hitUser = await this.client.user.findUnique({
      where: {
        name,
      },
    });

    if( !hitUser ) {
      return null;
    }

    if (hashCompare(pass, hitUser.hash)) {
      return hitUser;
    } else {
      return null;
    }
  }
}
