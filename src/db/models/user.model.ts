'use strict';

import { hash, hashCompare } from '../../utils/hash';
import { SESSION_SECRET } from '../../constants/constant';
import { v4 as uuidV4, v5 as uuidV5 } from 'uuid';

import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserModel {
  readonly repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }

  public async getBySession(session: string): Promise<UserEntity> {
    return await this.repository.findOne({ session });
  }

  public async enableSession(user: UserEntity): Promise<string> {
    user.session = uuidV5(user.name + SESSION_SECRET, uuidV4());
    const enabledUser = await this.repository.save(user);
    return enabledUser.session;
  }

  public async add(name: string, pass: string): Promise<UserEntity> {
    const hashStr = hash(pass);
    const user = await this.repository.save({
      name,
      hash: hashStr,
    });
    return user;
  }

  public async getByAuthInfo(name: string, pass: string): Promise<UserEntity> {
    const user = await this.repository.findOne({ name });

    if (!user) {
      return null;
    }

    if (hashCompare(pass, user.hash)) {
      return user;
    } else {
      return null;
    }
  }
}
