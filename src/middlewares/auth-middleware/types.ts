import { THttpMethod } from '@/types/network';
import { Role } from '@prisma/client';

export interface IProtectedRouteConfig {
  path: string;
  methods: THttpMethod[];
}

export interface IRestrictedRouteConfig {
  path: string;
  methods: THttpMethod[];
}
