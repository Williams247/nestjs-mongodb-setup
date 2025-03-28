import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todos } from '../schema/todos.schema';
import { ServiceResponseType } from '../provider/types';

@Injectable()
export class TodosService {
  constructor(
    // Inject the todos model to the service
    @InjectModel(Todos.name) private readonly todoModel: Model<Todos>,
  ) {}

  async createATodoList({
    text,
    note,
  }: {
    text: string;
    note: string;
  }): Promise<ServiceResponseType> {
    try {
      const createTodo = new this.todoModel({
        text,
        createdAt: new Date().toISOString(),
        note,
      });

      await createTodo.save();

      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'Todo created',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'An error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
