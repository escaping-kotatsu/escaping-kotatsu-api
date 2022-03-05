'use strict';

import { KotatsuModel } from '../db/models/kotatsu.model';
import { KotatsuEntity } from '../db/entities/kotatsu.entity';

export class KotatsuService {
  readonly model: KotatsuModel;

  constructor() {
    this.model = new KotatsuModel();
  }

  public async getById(id: number): Promise<KotatsuEntity> {
    return await this.model.getById(id);
  }

  public async add(): Promise<KotatsuEntity> {
    return await this.model.add();
  }

  public async updateConfig(id: number, pullTime: number, pullTimer: number): Promise<KotatsuEntity> {
    return await this.model.updateConfig(id, pullTime, pullTimer);
  }

  public async togglePulling(id: number): Promise<KotatsuEntity> {
    return await this.model.togglePulling(id);
  }
}
