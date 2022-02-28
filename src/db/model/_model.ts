'use strict';

import { PrismaClient } from '@prisma/client';

export class Model {
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient({
      log: ['query'],
    });
  }
}
