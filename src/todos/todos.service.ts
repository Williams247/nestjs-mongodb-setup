import { HttpStatus, Injectable } from '@nestjs/common';
import { Todos } from '../schema/todos.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todos.name) private readonly todoModel: Model<Todos>,
  ) {}

  async createATodoList({ text, note }) {
    try {
      const createTodo = new this.todoModel({
        text,
        createdAt: new Date().toISOString(),
        note,
      });

      await createTodo.save()

      return {
        message: 'Todo created',
        status: HttpStatus.CREATED
      }
    } catch (error) {
      throw error;
    }
  }
}

