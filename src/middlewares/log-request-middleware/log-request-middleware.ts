// APP
import { ApiInternalServerErrorResponse } from '@/utility/response/response';

// ENV
const apiBaseUrl = process.env.APP_API_BASE_URL;
const logSecret = process.env.LOG_SECRET;

// ============================| LOG REQUEST MIDDLEWARE |============================ //
export function logRequest(req: Request) {
  try {
    fetch(`${apiBaseUrl}/log-write`, {
      method: 'POST',
      body: JSON.stringify({
        level: 'info',
        message: `${req.method} ${req.url}`,
        secret: logSecret,
      }),
    });

    // Continue with the next middleware by returning null
    return null;
  } catch (error) {
    fetch(`${apiBaseUrl}/log-write`, {
      method: 'POST',
      body: JSON.stringify({
        level: 'error',
        message: '❗ AUTHENTICATION MIDDLEWARE ERROR ❗',
        secret: logSecret,
        error: error,
      }),
    });

    return ApiInternalServerErrorResponse();
  }
}
