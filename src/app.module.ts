import { Module } from '@nestjs/common';

import { TodosModule } from './todos/todos.module';

import { DataBaseConfig } from './schema/db.config';
import { Config } from './utils/config';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    Config.configEnv(),
    AdminModule,
    TodosModule,
    AuthModule,
    UserModule,
    DataBaseConfig.runConnection(),
  ],
})
export class AppModule {}
