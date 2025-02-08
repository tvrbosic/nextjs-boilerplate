import { THttpMethod } from '@/types/network';

export interface IRestrictedRouteConfig {
  path: string;
  methods: THttpMethod[];
}
