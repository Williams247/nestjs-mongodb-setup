import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { FetchService } from '../fetch';

@Controller('todos')
export class TodosController {
  constructor(
    private todoService: TodosService,
    private fetchService: FetchService,
  ) {}

  @Get()
  async getTodos() {
    return this.fetchService.fetch({ modelName: 'Todos' });
  }

  @Post()
  async createTodo(@Body() payload: { text: string; note: string }) {
    return this.todoService.createATodoList(payload);
  }

  @Get(':id')
  getTodosById() {}
}
