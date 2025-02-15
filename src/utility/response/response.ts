// LIBRARY
import { NextResponse } from 'next/server';

// TYPES
import {
  IApiResponseProps,
  IApiResponse,
  IApiErrorResponseProps,
  IApiErrorResponse,
} from '@/utility/response/type';

export function ApiResponse<T>({
  status,
  message,
  data,
}: IApiResponseProps<T>) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    } as IApiResponse<T>,
    { status }
  );
}

export function ApiErrorResponse({ status, message }: IApiErrorResponseProps) {
  return NextResponse.json(
    {
      success: false,
      message,
    } as IApiErrorResponse,
    { status }
  );
}

export function ApiInternalServerErrorResponse() {
  return NextResponse.json(
    {
      success: false,
      message: 'Internal Server Error',
    } as IApiErrorResponse,
    { status: 500 }
  );
}
