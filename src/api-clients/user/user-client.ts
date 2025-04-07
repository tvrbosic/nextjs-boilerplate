// LIB
import axios, { AxiosInstance } from 'axios';

// TYPES
import {
  ICreateUserParams,
  IGetUserParams,
  IPartialUpdateUserParams,
  IUpdateUserParams,
  IUploadAvatarParams,
  IUpdatePasswordParams,
  IDeleteUserParams,
  IPartialUpdateUserResponse,
} from '@/api-clients/user/types';
import { IApiSuccessResponse } from '@/utility/response/type';
import { IGetUserDTO } from '@/app/api/v1/user/types';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export class UserApiClient {
  static #instance: UserApiClient;
  private axiosInstance: AxiosInstance;

  // Private to prevent direct construction calls with the `new` operator.
  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${baseUrl}/user`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Instance getter, that lets clients access the unique singleton instance.
  public static get instance(): UserApiClient {
    if (!UserApiClient.#instance) {
      UserApiClient.#instance = new UserApiClient();
    }

    return UserApiClient.#instance;
  }

  public async getUsers(): Promise<IApiSuccessResponse<IGetUserDTO>[]> {
    const response = await this.axiosInstance.get('');
    return response.data;
  }

  public async createUser(
    user: ICreateUserParams
  ): Promise<IApiSuccessResponse<IGetUserDTO>> {
    const response = await this.axiosInstance.post('', user);
    return response.data;
  }

  public async getUser({
    guid,
  }: IGetUserParams): Promise<IApiSuccessResponse<IGetUserDTO>> {
    const response = await this.axiosInstance.get(`/${guid}`);
    return response.data;
  }

  public async partialUpdateUser({
    guid,
    user,
  }: IPartialUpdateUserParams): Promise<
    IApiSuccessResponse<IPartialUpdateUserResponse>
  > {
    const response = await this.axiosInstance.patch(`/${guid}`, user);
    return response.data;
  }

  public async uploadAvatar({
    guid,
    file,
  }: IUploadAvatarParams): Promise<IApiSuccessResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.axiosInstance.post(
      `/${guid}/upload-avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  }

  public async updateUser({
    guid,
    user,
  }: IUpdateUserParams): Promise<IApiSuccessResponse<IGetUserDTO>> {
    const response = await this.axiosInstance.put(`/${guid}`, user);
    return response.data;
  }

  public async updatePassword({
    guid,
    passwords,
  }: IUpdatePasswordParams): Promise<IApiSuccessResponse<IGetUserDTO>> {
    const response = await this.axiosInstance.patch(
      `/${guid}/update-password`,
      passwords
    );
    return response.data;
  }

  public async deleteUser({ guid }: IDeleteUserParams): Promise<any> {
    const response = await this.axiosInstance.delete(`/${guid}`);
    return response.data;
  }
}
