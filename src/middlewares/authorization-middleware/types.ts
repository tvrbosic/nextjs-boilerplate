import { THttpMethod } from '@/types/network';
import { Role } from '@prisma/client';

export interface IRestrictedRouteConfig {
  path: string;
  methods: THttpMethod[];
  roles: Role[];
}

export interface IIsRestrictedRouteResult {
  isRestricted: boolean;
  allowedRoles: Role[];
}
