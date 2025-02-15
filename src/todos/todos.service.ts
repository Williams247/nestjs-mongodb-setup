import { HttpStatus, Injectable } from '@nestjs/common';
import { Todos } from '../schema/todos.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceResponseType } from '../types';

@Injectable()
export class TodosService {
  constructor(
    // Inject the todos model to the service
    @InjectModel(Todos.name) private readonly todoModel: Model<Todos>,
  ) {}

  async createATodoList({ text, note }): Promise<ServiceResponseType> {
    try {
      const createTodo = new this.todoModel({
        text,
        createdAt: new Date().toISOString(),
        note,
      });

      await createTodo.save();

      return {
        status: HttpStatus.CREATED,
        success: true,
        message: 'Todo created',
      };
    } catch (error) {
      throw error;
    }
  }
}
