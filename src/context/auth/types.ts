import { Role } from '@prisma/client';

export interface IAuthContextUser {
  guid: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarImageFilename?: string;
  avatarImageUrl?: string;
  role: Role;
  exp?: number;
}

export interface IAuthContext {
  user: IAuthContextUser | null;
  isVerifying: boolean;
  setUser: (user: IAuthContextUser) => void;
  clearUser: () => void;
  updateUserAvatar: (avatarImageUrl: string) => void;
}
