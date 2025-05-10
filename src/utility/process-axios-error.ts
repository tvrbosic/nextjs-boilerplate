// LIB
import { AxiosError } from 'axios';

// TYPES
import { IApiErrorResponse } from '@/utility/response/type';

interface IprocessAxiosErrorProps {
  error: unknown;
}

export default function processAxiosError({
  error,
}: IprocessAxiosErrorProps): string {
  /** NOTE:
   * Error boundaries cannot catch errors thrown in event hanlders (i.e. onClick).
   * We must return values for errors and handle them manually for example with useEffects.
   */

  if (
    error instanceof AxiosError &&
    error.status !== undefined &&
    error.status < 500
  ) {
    // Handle 400, 401, 403 errors by returning the error message
    const response = error.response?.data as IApiErrorResponse;

    return response.message;
  }
  // Return '500' for internal server errors (or if not AxiosError)
  return '500';
}
