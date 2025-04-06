import { IHasGuid } from '@/types/global';
import { Role } from '@prisma/client';

export interface IGetUserParams {
  params: Promise<IHasGuid>;
}

export interface IUpdateUserParams {
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
}
