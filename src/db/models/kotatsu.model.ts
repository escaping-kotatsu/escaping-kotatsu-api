'use strict';

import { getRepository, Repository } from 'typeorm';
import { KotatsuEntity } from '../entities/kotatsu.entity';

export class KotatsuModel {
  readonly repository: Repository<KotatsuEntity>;

  constructor() {
    this.repository = getRepository(KotatsuEntity);
  }

  public async getById(id: number): Promise<KotatsuEntity> {
    return await this.repository.findOne({ id });
  }

  public async add(): Promise<KotatsuEntity> {
    const kotatsu = await this.repository.save({});
    return kotatsu;
  }

  public async updateConfig(id: number, pullTime: number, pullTimer: number): Promise<KotatsuEntity> {
    const kotatsu = await this.getById(id);
    if (!kotatsu) {
      return;
    }

    kotatsu.pullTime = pullTime;
    kotatsu.pullTimer = pullTimer;

    const updatedKotatsu = await this.repository.save(kotatsu);
    return updatedKotatsu;
  }

  public async togglePulling(id: number): Promise<KotatsuEntity> {
    const kotatsu = await this.getById(id);
    if (!kotatsu) {
      return;
    }

    kotatsu.pulling = !kotatsu.pulling;

    const updatedKotatsu = await this.repository.save(kotatsu);
    return updatedKotatsu;
  }
}
