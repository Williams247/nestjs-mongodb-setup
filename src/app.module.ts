import { Module } from '@nestjs/common';

import { TodosModule } from './module/todos/todos.module';

import { DataBaseConfig } from './schema/db.config';
import { Config } from './utils/config';

import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    Config.configEnv(),
    TodosModule,
    AuthModule,
    UserModule,
    DataBaseConfig.runConnection(),
  ],
})
export class AppModule {}
