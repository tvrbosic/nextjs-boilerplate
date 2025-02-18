import { IHasGuid } from '@/types/global';

export interface IGetUserParams {
  params: Promise<IHasGuid>;
}

export interface IPutUserParams {
  params: Promise<IHasGuid>;
}

export interface IDeleteUserParams {
  params: Promise<IHasGuid>;
}
