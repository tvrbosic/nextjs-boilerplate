// APP
import withApiErrorHandler from '@/utility/api-error-handler/api-error-handler';
import logger from '@/logger';
import { ApiSuccessResponse } from '@/utility/response/response';

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
  // Extract payload from body
  const { level, message, error, secret } = await req.json();

  // Validate secret to ensure only internal middleware can invoke this logging endpoint. This prevents unauthorized external requests from writing logs.
  if (secret !== logSecret) return;

  switch (level) {
    case 'error':
      logger.error(message, error);
      break;
    case 'warn':
      logger.warn(message);
      break;
    case 'info':
      logger.info(message);
      break;
    case 'http':
      logger.http(message);
      break;
    case 'verbose':
      logger.verbose(message);
      break;
    case 'debug':
      logger.debug(message);
      break;
    case 'silly':
      logger.silly(message);
      break;
  }

  return ApiSuccessResponse({ message: 'Log processed.' });
});
