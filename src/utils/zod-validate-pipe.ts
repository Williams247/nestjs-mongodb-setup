import {
  PipeTransform,
  Injectable,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema<any>) {}

  transform(payload: any) {
    try {
      // (try block) Validates the schema definition against payload params/input to know if it passes.
      return this.schema.parse(payload);
    } catch (error) {
      if (error instanceof ZodError) {
        // (catch block) When validation fails, this block catches the error
        const firstError = this.getFirstError(error); // Function to break down the errors
        throw new BadRequestException(firstError); // Returns error as an object with status code and error message
      }
      return {
        message: 'An error occured',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      }; // Fall back error if (!error)
    }
  }

  private getFirstError(error: ZodError): Record<string, string | number> {
    const formattedError = error.format(); // error.format() helps to arrange/clean the error object

    // Runs a loop on the formattedError object
    for (const key in formattedError) {
      // Ignores _errors: [] and checks for the first error and return it
      if (key !== '_errors' && formattedError[key]?._errors?.length > 0) {
        return formattedError[key]._errors[0]; // Gets the target error by index (key and 0 under _errors[])
      }
    }

    return {
      message: 'An error occured',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    }; // Fall back error
  }
}
