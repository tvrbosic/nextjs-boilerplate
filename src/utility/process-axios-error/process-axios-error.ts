// LIB
import { AxiosError } from 'axios';

// TYPES
import { IProcessErrorProps } from '@/utility/process-axios-error/types';
import { IApiErrorResponse } from '../response/type';

export default function processError({ error, onError }: IProcessErrorProps) {
  if (
    error instanceof AxiosError &&
    error.status !== undefined &&
    error.status >= 500
  ) {
    // Handle 400, 401, 403 errors by returning the message and executing optinal callback
    const response = error.response?.data as IApiErrorResponse;
    onError && onError();

    return response.message;
  }

  // Re-throw 5xx errors (or if not AxiosError)
  throw error;
}
