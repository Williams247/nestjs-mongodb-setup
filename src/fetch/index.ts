import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todos } from '../schema/todos.schema';
import { FetchProps, ServiceResponseType } from './types';

@Injectable()
export class FetchService {
  private modelMap: Record<string, Model<any>>;

  constructor(
    @InjectModel(Todos.name) private readonly todoModel: Model<Todos>,
  ) {
    this.modelMap = {
      Todos: this.todoModel,
    };
  }

  async fetch({
    modelName,
    page,
    limit,
    searchParams,
    populate,
    selectParms,
  }: FetchProps): Promise<ServiceResponseType> {
    try {
      const pageRequest = Number(page ?? 1);
      const limitRequest = Number(limit ?? 10);

      const model = this.modelMap[modelName];
      if (!model) throw new Error('Model name is requird');

      const count = await model.countDocuments();

      const data = await model
        .find({ ...searchParams })
        .skip((pageRequest - 1) * limitRequest)
        .limit(limitRequest)
        .populate(populate ?? '')
        .select(selectParms ?? '-password');

      if (!data) {
        return {
          status: HttpStatus.NOT_FOUND,
          success: true,
          message: 'Resource not found',
        };
      }

      return {
        status: HttpStatus.OK,
        success: true,
        message: 'Success',
        data: {
          totalItems: count,
          currentPage: pageRequest,
          pages: Math.ceil(count / limitRequest),
          results: data,
        },
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
