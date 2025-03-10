import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FetchService } from '../provider/fetch.service';
import { DatabaseConfig } from '../schema/db.config'

@Module({
  imports: [DatabaseConfig.getSharedSchema()],
  controllers: [AuthController],
  providers: [AuthService, FetchService],
  exports: [DatabaseConfig.getSharedSchema()]
})
export class AuthModule {}
