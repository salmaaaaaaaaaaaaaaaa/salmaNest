import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    MessagesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src'),
    }),
    EmployeeModule,
  ],
})
export class AppModule {}
