import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FetchService } from '../provider/fetch.service';
import { DataBaseConfig } from '../schema/db.config';
import { Config } from '../utils/config';
@Module({
  imports: [DataBaseConfig.getSharedSchema(), Config.configureJWT()],
  controllers: [AuthController],
  providers: [AuthService, FetchService],
  exports: [DataBaseConfig.getSharedSchema(), Config.configureJWT()],
})
export class AuthModule {}
