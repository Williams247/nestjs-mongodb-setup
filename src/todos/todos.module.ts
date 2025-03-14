import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { FetchService } from '../provider/fetch.service';
import { DataBaseConfig } from '../schema/db.config'
@Module({
  imports: [DataBaseConfig.getSharedSchema()],
  controllers: [TodosController],
  providers: [TodosService, FetchService],
  exports: [DataBaseConfig.getSharedSchema()],
})
export class TodosModule {}
