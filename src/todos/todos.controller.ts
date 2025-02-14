import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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
