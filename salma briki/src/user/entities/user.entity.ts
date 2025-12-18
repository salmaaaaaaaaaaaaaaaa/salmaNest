import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  BeforeInsert,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
} from 'typeorm';
import { Logger } from '@nestjs/common';

@Entity('users')
export class User {
  private readonly logger = new Logger(User.name);

  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  activatedAt?: Date;

  // HOOKS
  @BeforeInsert()
  beforeInsert() {
    this.logger.log(`Avant insertion → email: ${this.email}`);
  }

  @AfterInsert()
  afterInsert() {
    this.logger.log(`Utilisateur créé → ID: ${this._id}, email: ${this.email}`);
  }

  @AfterUpdate()
  afterUpdate() {
    this.logger.log(`Utilisateur mis à jour → ID: ${this._id}`);
  }

  @BeforeRemove()
  beforeRemove() {
    this.logger.warn(`Suppression imminente → ID: ${this._id}, email: ${this.email}`);
  }

  // Hook personnalisé (appelé manuellement depuis le service)
  logRetrieval() {
    this.logger.log(`Utilisateur récupéré → ID: ${this._id}, email: ${this.email}`);
  }
}