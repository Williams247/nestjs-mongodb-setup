import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todos, TodosSchema } from '../schema/todos.schema';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { FetchService } from '../fetch/index.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todos.name, schema: TodosSchema }]),
  ],
  controllers: [TodosController],
  providers: [TodosService, FetchService],
})
export class TodosModule {}
