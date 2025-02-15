import {
  IApiResponseProps,
  IApiResponse,
  IApiErrorResponseProps,
  IApiErrorResponse,
} from '@/utility/response/type';

export function ApiResponse<T>({
  message,
  data,
}: IApiResponseProps<T>): IApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function ApiErrorResponse({
  message,
}: IApiErrorResponseProps): IApiErrorResponse {
  return {
    success: false,
    message,
  };
}
