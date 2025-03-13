import { Role } from '@prisma/client';

export interface IAuthContextUser {
  guid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  exp?: number;
}

export interface IAuthContext {
  user: IAuthContextUser | null;
  setUser: (user: IAuthContextUser) => void;
  clearUser: () => void;
}
