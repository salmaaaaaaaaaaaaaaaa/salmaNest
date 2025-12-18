// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DATABASE_URL || 'mongodb://localhost:27017/atelier-typeorm',
  autoLoadEntities: true,     // charge automatiquement toutes les @Entity
  synchronize: true,          // false en prod
  logging: true,
  // useNewUrlParser et useUnifiedTopology n’existent PLUS → supprimés
};