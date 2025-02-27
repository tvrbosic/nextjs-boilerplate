// APP
import withApiErrorHandler from '@/utility/api-error-handler/api-error-handler';
import logger from '@/logger';
import {
  ApiSuccessResponse,
  ApiUnauthorizedResponse,
} from '@/utility/response/response';

// ENV
const logSecret = process.env.LOG_SECRET;

/**
 * Next.js middleware uses Edge Runtime which does not support writing to the filesystem (which should be resolved in future Next.js releases).
 * Due to Edge runtime environment limitations, we cannot log to files directly from middleware.
 *
 * As workaround, middleware sends log data to this dedicated API route, which runs in the Node.js server environment.
 * This endpoint should only be called from middleware to capture logs that occur during request processing.
 *
 * NEXT.JS RUNTIMES: https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 */
export const POST = withApiErrorHandler(async (req: Request) => {
  let requestLogger = logger;

  // Extract payload from body
  const { level, message, error, secret, payload } = await req.json();

  // Validate secret to ensure only internal middleware can invoke this logging endpoint. This prevents unauthorized external requests from writing logs.
  if (secret !== logSecret) return ApiUnauthorizedResponse();

  // If payload exists (POST, PUT, PATCH) create child logger and add payload data to it
  if (payload !== undefined) {
    requestLogger = logger.child({ payload });
  }

  switch (level) {
    case 'error':
      requestLogger.error(message, error);
      break;
    case 'warn':
      requestLogger.warn(message);
      break;
    case 'info':
      requestLogger.info(message);
      break;
    case 'http':
      requestLogger.http(message);
      break;
    case 'verbose':
      requestLogger.verbose(message);
      break;
    case 'debug':
      requestLogger.debug(message);
      break;
    case 'silly':
      requestLogger.silly(message);
      break;
  }

  return ApiSuccessResponse({ message: 'Log processed.' });
});
