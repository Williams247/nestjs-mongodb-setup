import { HttpStatus } from '@nestjs/common';

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
