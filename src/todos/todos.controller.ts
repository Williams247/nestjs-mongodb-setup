import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { FetchService } from '../provider/fetch.service';
import { DbSchema } from '../provider/types';

@Controller('todos')
export class TodosController {
  constructor(
    private todoService: TodosService,
    private fetchService: FetchService,
  ) {}

  @Get()
  async getTodos() {
    return this.fetchService.fetch({ modelName: DbSchema.TODOS });
  }

  @Post()
  async createTodo(@Body() payload: { text: string; note: string }) {
    return this.todoService.createATodoList(payload);
  }

  @Get(':id')
  getTodosById() {}
}
