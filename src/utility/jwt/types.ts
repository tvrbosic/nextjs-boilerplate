import { Role } from '@prisma/client';

export interface IUserJwtClaims {
  guid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatarImageFilename?: string;
  avatarImageUrl?: string;
  exp?: number;
}
