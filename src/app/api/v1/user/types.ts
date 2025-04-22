import { IHasGuid } from '@/types/global';
import { Role } from '@prisma/client';

export interface IGetUserParams {
  params: Promise<IHasGuid>;
}

export interface IPostUserParams {
  params: Promise<IHasGuid>;
}

export interface IPostUploadAvatarParams {
  params: Promise<IHasGuid>;
}

export interface IPatchUserParams {
  params: Promise<IHasGuid>;
}

export interface IDeleteUserParams {
  params: Promise<IHasGuid>;
}

export interface IGetUserDTO {
  guid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatarImageUrl?: string | null;
}
