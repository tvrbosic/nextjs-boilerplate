import { TUserJwtClaims } from '@/utility/jwt/types';

export type THttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export type TAuthenticatedRequest = Request & { user?: TUserJwtClaims };
