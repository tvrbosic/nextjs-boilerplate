// APP
import { maskObjectSensitiveFields } from '@/utility/general-utils/general-utils';
import { ApiInternalServerErrorResponse } from '@/utility/response/response';

// ENV
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const logSecret = process.env.LOG_SECRET;

/**
 * Next.js middleware uses Edge Runtime which does not support writing to the filesystem (which should be resolved in future Next.js releases).
 * Due to Edge runtime environment limitations, we cannot log to files directly from middleware.
 *
 * As workaround, middleware sends log data to dedicated API route, which runs in the Node.js server environment.
 * This endpoint should only be called from middleware to capture logs that occur during request processing.
 *
 * NEXT.JS RUNTIMES: https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 */

// ============================| LOG REQUEST MIDDLEWARE |============================ //
export async function logRequest(req: Request) {
  try {
    if (
      req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'PATCH'
    ) {
      const payload = await req.json();
      // Extract payload from body and mask sensitive fields like passwords (avoid logging them)
      const maskedPayload = payload ? maskObjectSensitiveFields(payload) : null;

      fetch(`${apiBaseUrl}/log-write`, {
        method: 'POST',
        body: JSON.stringify({
          level: 'http',
          message: `${req.method} ${req.url}`,
          secret: logSecret,
          payload: maskedPayload,
        }),
      });
    } else {
      fetch(`${apiBaseUrl}/log-write`, {
        method: 'POST',
        body: JSON.stringify({
          level: 'http',
          message: `${req.method} ${req.url}`,
          secret: logSecret,
        }),
      });
    }

    // Continue with the next middleware by returning null
    return null;
  } catch (error) {
    let errorMessage = 'Unknown error';
    let errorStack: string | undefined;

    if (error instanceof Error) {
      errorMessage = error.message;
      errorStack = error.stack;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (typeof error === 'object' && error !== null) {
      errorMessage = JSON.stringify(error);
    }

    fetch(`${apiBaseUrl}/log-write`, {
      method: 'POST',
      body: JSON.stringify({
        level: 'error',
        message: '❗ LOG REQUEST MIDDLEWARE ERROR ❗',
        secret: logSecret,
        error: { message: errorMessage, stack: errorStack },
      }),
    });

    return ApiInternalServerErrorResponse();
  }
}
