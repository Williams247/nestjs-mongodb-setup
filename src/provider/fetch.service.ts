import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todos } from '../schema/todos.schema';
import { User } from '../schema/user.schema';
import { FetchProps } from './types';
import { ServiceResponseType, FetchOneProps, DbSchema } from './types';
@Injectable()
export class FetchService {
  private modelMap: Record<string, Model<any>>;

  constructor(
    // Inject model to service so the service can make use of the model
    @InjectModel(Todos.name) private readonly todoModel: Model<Todos>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    this.modelMap = {
      [DbSchema.TODOS]: this.todoModel,
      [DbSchema.USER]: this.userModel,
    };
  }

  async fetchOne({
    modelName,
    searchParams,
    selectParms,
    populate,
    message,
  }: FetchOneProps): Promise<ServiceResponseType> {
    try {
      const model = this.modelMap[modelName];
      if (!model) throw new Error('Model name is required');

      const data = await model
        .findOne(searchParams)
        .populate(populate ?? '')
        .select(selectParms ?? '-password');

      if (!data) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: message ?? 'Resource not found',
          data: null,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: message ?? 'Success',
        data: data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'An error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetch({
    modelName,
    page,
    limit,
    searchParams,
    populate,
    selectParms,
    message,
  }: FetchProps): Promise<ServiceResponseType> {
    try {
      const pageRequest = Number(page ?? 1);
      const limitRequest = Number(limit ?? 10);

      const model = this.modelMap[modelName];
      if (!model) throw new Error('Model name is required');

      const count = await model.countDocuments();

      const data = await model
        .find({ ...searchParams })
        .skip((pageRequest - 1) * limitRequest)
        .limit(limitRequest)
        .populate(populate ?? '')
        .select(selectParms ?? '-password');

      if (!data) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: message ?? 'Resource not found',
        };
      }

      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: message ?? 'Success',
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
