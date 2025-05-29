// LIBRARY
import { Prisma } from '@prisma/client';

// APP
import { ApiBadRequestResponse, ApiInternalServerErrorResponse } from '@/utility/response/response';
import logger from '@/logger';

export default function withApiErrorWrapper(fn: Function) {
  return async function (request: Request, ...args: any[]) {
    try {
      // Execute API route handler and catch possible errors
      return await fn(request, ...args);
    } catch (error) {
      // ============================| HANDLE PRISMA ERRORS |============================ //
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        /**
         * INFO: Why dont we log whole error object?
         * PrismaClientKnownRequestError is not a plain JavaScript object, it's an instance of an error class which has internal properties
         * that don't serialize well (e.g., properties that resolve to null or complex prototype chains). This can cause issues and break code.
         */
        const logErrorObject = {
          code: error.code,
          message: error.message,
          meta: error.meta,
        };

        switch (error.code) {
          case 'P2002':
            logger.error('❗ PRISMA ERROR ❗', logErrorObject);
            return ApiBadRequestResponse({
              message: 'There was an unique constraint violation in your request. Check request data and try again.',
            });
          case 'P2025':
            logger.error('❗ PRISMA ERROR ❗', logErrorObject);
            return ApiBadRequestResponse({
              message: 'Targeted entity was not found. Check request data and try again.',
            });
          default:
            logger.error('❗ PRISMA ERROR ❗', logErrorObject);
            return ApiInternalServerErrorResponse();
        }
      }

      // ============================| HANDLE UNKNOWN ERRORS |============================ //
      logger.error('❗ UNKNOWN API REQUEST ERROR ❗', error);
      return ApiInternalServerErrorResponse();
    }
  };
}
