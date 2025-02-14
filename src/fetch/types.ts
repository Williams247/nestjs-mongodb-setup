import { HttpStatus } from '@nestjs/common';

type selectParmsProps =
  | string
  | Array<string>
  | Record<string, number | boolean | object>;

type PopulateRecord = string | Array<string>;

export interface FetchProps {
  modelName: string;
  page?: string;
  limit?: string;
  searchParams?: Record<string, any>;
  populate?: PopulateRecord;
  selectParms?: selectParmsProps;
}

export interface FetchResponsePayload {
  totalItems?: number;
  currentPage?: number;
  pages?: number;
  results: any;
}

export interface ServiceResponseType {
  status: HttpStatus;
  success: boolean;
  message: string;
  data?: FetchResponsePayload | null;
}
