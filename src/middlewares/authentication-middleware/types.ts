import { THttpMethod } from '@/types/network';

export interface IProtectedRouteConfig {
  path: string;
  methods: THttpMethod[];
}
