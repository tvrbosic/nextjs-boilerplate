import { User } from '@prisma/client';

export interface IAuthContext {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
