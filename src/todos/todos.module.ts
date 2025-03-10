import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { FetchService } from '../provider/fetch.service';
import { DatabaseConfig } from '../schema/db.config';
@Module({
  imports: [DatabaseConfig.getRegisteredSchema()],
  controllers: [TodosController],
  providers: [TodosService, FetchService],
  exports: [DatabaseConfig.getRegisteredSchema()],
})
export class TodosModule {}
