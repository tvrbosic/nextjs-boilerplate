import { IRestrictedRouteConfig } from '@/middlewares/authorization-middleware/types';

// ============================| CONFGURATION |============================ //
/**
 * Configuration array for defining restricted routes (routes allowed only to users of specific role).
 * Array is used to check if a specific route, HTTP method combination and which roles should be allowed to user making request.
 */
export const restrictedRoutes: IRestrictedRouteConfig[] = [
  // -----------------------------< USER >----------------------------- //
  {
    path: '/api/v1/user',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roles: ['ADMIN'],
  },
  {
    path: '/api/v1/user/[guid]',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roles: ['ADMIN'],
  },
  {
    path: '/api/v1/user/[guid]/update-password',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roles: ['ADMIN'],
  },
  // -----------------------------< AUTH >----------------------------- //
  {
    path: '/api/v1/auth/forgot-password',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roles: ['ADMIN'],
  },
  {
    path: '/api/v1/auth/reset-password/[token]',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roles: ['ADMIN'],
  },
];
