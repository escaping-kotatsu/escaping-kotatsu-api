'use strict';

import { UserModel } from '../db/models/user.model';
import { UserEntity } from '../db/entities/user.entity';

export class UserService {
  readonly model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async getBySession(session: string): Promise<UserEntity> {
    return await this.model.getBySession(session);
  }

  public async enableSession(user: UserEntity): Promise<string> {
    return await this.model.enableSession(user);
  }

  public async add(name: string, pass: string): Promise<UserEntity> {
    return await this.model.add(name, pass);
  }

  public async getByAuthInfo(name: string, pass: string): Promise<UserEntity> {
    return await this.model.getByAuthInfo(name, pass);
  }
}
