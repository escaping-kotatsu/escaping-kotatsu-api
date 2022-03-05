'use strict';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'kotatsu' })
export class KotatsuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'pulling', default: false, nullable: false })
  public pulling: boolean;

  @Column({ name: 'pull_timer', default: 5, nullable: false })
  public pullTimer: number;

  @Column({ name: 'pull_time', nullable: true })
  /**
   * unix time
   */
  public pullTime: number;

  @Column({ name: 'using', default: true, nullable: false })
  public using: boolean;

  @CreateDateColumn()
  readonly created?: Date;

  @UpdateDateColumn()
  readonly updated?: Date;
}

export default KotatsuEntity;
