import { Module } from '@nestjs/common';
import { Config } from '../utils/config';
import { DataBaseConfig } from '../schema/db.config'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FetchService } from '../provider/fetch.service';

@Module({
  imports: [DataBaseConfig.getSharedSchema(), Config.configureJWT()],
  controllers: [UserController],
  providers: [UserService, FetchService],
  exports: [DataBaseConfig.getSharedSchema(), Config.configureJWT()],
})
export class UserModule {}
