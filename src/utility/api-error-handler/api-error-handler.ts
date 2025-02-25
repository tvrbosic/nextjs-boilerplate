// APP
import { ApiInternalServerErrorResponse } from '@/utility/response/response';

export default function withApiErrorHandler(fn: Function) {
  return async function (request: Request, ...args: any[]) {
    try {
      return await fn(request, ...args);
    } catch (error) {
      console.error('!!! API REQUEST ERROR !!!');
      console.error(`Error occured during processing: ${request.url}`);
      console.error('Error details: ');
      console.error(error);

      return ApiInternalServerErrorResponse();
    }
  };
}
