// LIB
import { AxiosError } from 'axios';

// TYPES
import { IprocessAxiosErrorProps } from '@/utility/process-axios-error/types';
import { IApiErrorResponse } from '../response/type';

export default function processAxiosError({
  error,
}: IprocessAxiosErrorProps): string {
  if (
    error instanceof AxiosError &&
    error.status !== undefined &&
    error.status < 500
  ) {
    // Handle 400, 401, 403 errors by returning the error message
    const response = error.response?.data as IApiErrorResponse;

    return response.message;
  }

  // Re-throw 5xx errors (or if not AxiosError)
  throw error;
}
