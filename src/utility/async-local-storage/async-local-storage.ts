// LIBRARY
import { AsyncLocalStorage } from 'node:async_hooks'; // AsyncLocalStorage is a request-scoped storage that persists across asynchronous function calls

// TYPES
import { TUserJwtClaims } from '@/utility/jwt/types';

// ============================| EXPORTED ASYNC LOCAL STORAGES |============================ //
export const authenticatedRequestALS = new AsyncLocalStorage<TUserJwtClaims>();
