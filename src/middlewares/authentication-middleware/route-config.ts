import { IProtectedRouteConfig } from '@/middlewares/authentication-middleware/types';

// ============================| CONFGURATION |============================ //
/**
 * Configuration array for defining protected routes (routes allowed only to authenticated users).
 * Array is used to check if a specific route and HTTP method combination should be allowed to user making request.
 */
export const protectedRoutes: IProtectedRouteConfig[] = [
  // -----------------------------< USER >----------------------------- //
  {
    path: '/api/v1/user',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
  {
    path: '/api/v1/user/[guid]',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
  {
    path: '/api/v1/user/[guid]/update-password',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
  // -----------------------------< AUTH >----------------------------- //
  {
    path: '/api/v1/auth/forgot-password',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
  {
    path: '/api/v1/auth/reset-password/[token]',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
];
