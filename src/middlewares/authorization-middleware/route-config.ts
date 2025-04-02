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
    methods: ['GET', 'POST'],
    roles: ['ADMIN'],
  },
  {
    path: '/api/v1/user/[guid]',
    methods: ['GET', 'PUT', 'DELETE'],
    roles: ['ADMIN'],
  },
];
