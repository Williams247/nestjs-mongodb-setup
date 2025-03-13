import { HttpStatus } from '@nestjs/common';

export enum DbSchema {
  USER = 'USER',
  TODOS = 'TODOS',
}

type selectParmsProps =
  | string
  | Array<string>
  | Record<string, number | boolean | object>;

type PopulateRecord = string | Array<string>;

export interface FetchProps {
  modelName: DbSchema;
  page?: string;
  limit?: string;
  searchParams?: Record<string, any>;
  populate?: PopulateRecord;
  message?: string;
  selectParms?: selectParmsProps;
}

export interface FetchResponsePayload {
  totalItems?: number;
  currentPage?: number;
  pages?: number;
  results: any;
}

export interface FetchOneProps {
  modelName: DbSchema;
  searchParams: {};
  selectParms?: selectParmsProps;
  populate?: PopulateRecord;
  message?: string;
}

export interface ServiceResponseType {
  statusCode: HttpStatus;
  success: boolean;
  message: string;
  data?: FetchResponsePayload | any;
}
