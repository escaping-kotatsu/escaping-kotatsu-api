'use strict';

import { User } from '@prisma/client';
import { Model } from './_model';

export class UserModel extends Model {
  public async getBySession(session: string): Promise<User> {
    return await this.client.user.findUnique({
      where: {
        session,
      },
    });
  }
}
