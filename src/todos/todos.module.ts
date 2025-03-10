import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { FetchService } from '../provider/fetch.service';
import { DatabaseConfig } from '../schema/db.config';
@Module({
  imports: [DatabaseConfig.getSharedSchema()],
  controllers: [TodosController],
  providers: [TodosService, FetchService],
  exports: [DatabaseConfig.getSharedSchema()],
})
export class TodosModule {}
