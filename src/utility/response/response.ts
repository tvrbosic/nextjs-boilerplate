// LIB
import { NextResponse } from 'next/server';

// TYPES
import {
  IApiSuccessResponseProps,
  IApiSuccessResponse,
  IApiErrorResponseProps,
  IApiErrorResponse,
  IOptionalMessageProps,
  IOptionalMessageAndDataProps,
} from '@/utility/response/type';

// ENV
const apiBaseUrl = process.env.APP_API_BASE_URL;
const logSecret = process.env.LOG_SECRET;

// ====================================| SUCCESS |==================================== //
export function ApiSuccessResponse<T>({
  status = 200,
  message,
  data,
}: IApiSuccessResponseProps<T>) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    } as IApiSuccessResponse<T>,
    { status }
  );
}

export function ApiCreatedResponse<T>(props?: IOptionalMessageAndDataProps<T>) {
  const message = props?.message ?? 'Resource created successfully.';
  const data = props?.data;

  return NextResponse.json(
    {
      success: true,
      message,
      data,
    } as IApiSuccessResponse<T>,
    { status: 201 }
  );
}

// ====================================| ERROR |==================================== //
export function ApiErrorResponse({ status, message }: IApiErrorResponseProps) {
  return NextResponse.json(
    {
      success: false,
      message,
    } as IApiErrorResponse,
    { status }
  );
}

export function ApiBadRequestResponse(props?: IOptionalMessageProps) {
  const message =
    props?.message ??
    'There was an error with your request. Check request data and try again.';

  return NextResponse.json(
    {
      success: false,
      message,
    } as IApiErrorResponse,
    { status: 400 }
  );
}

export function ApiUnauthorizedResponse(props?: IOptionalMessageProps) {
  const message =
    props?.message ??
    'Access denied. Please provide valid authentication credentials to proceed.';

  return NextResponse.json(
    {
      success: false,
      message,
    } as IApiErrorResponse,
    { status: 401 }
  );
}

export function ApiForbiddenResponse(props?: IOptionalMessageProps) {
  const message =
    props?.message ?? 'You do not have permission to access this resource.';

  return NextResponse.json(
    {
      success: false,
      message,
    } as IApiErrorResponse,
    { status: 403 }
  );
}

export function ApiInternalServerErrorResponse() {
  return NextResponse.json(
    {
      success: false,
      message:
        'The server encountered an internal error and could not complete your request.',
    } as IApiErrorResponse,
    { status: 500 }
  );
}
