import { IHasGuid } from '@/types/global';

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
