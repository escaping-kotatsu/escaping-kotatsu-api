'use strict';

import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserModel {
  readonly repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }
}
