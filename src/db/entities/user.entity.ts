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

@Entity({ name: 'user' })
@Unique(['name'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'name', nullable: false })
  public name: string;

  @Column({ name: 'hash', nullable: false })
  public hash: string;

  @Column({ name: 'session', nullable: true })
  public session: string;

  @Column({ name: 'using', default: true, nullable: false })
  public using: boolean;

  @CreateDateColumn()
  readonly created?: Date;

  @UpdateDateColumn()
  readonly updated?: Date;
}

export default UserEntity;
