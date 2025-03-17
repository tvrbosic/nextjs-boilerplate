import axios, { AxiosInstance } from 'axios';
import {
  ICreateUserParams,
  IGetUserParams,
  IUpdateUserParams,
  IUpdatePasswordParams,
  IDeleteUserParams,
} from '@/api-clients/user/types';

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

  public async getUsers(): Promise<any> {
    const response = await this.axiosInstance.get('');
    return response.data;
  }

  public async createUser(user: ICreateUserParams): Promise<any> {
    const response = await this.axiosInstance.post('', user);
    return response.data;
  }

  public async getUser({ guid }: IGetUserParams): Promise<any> {
    const response = await this.axiosInstance.get(`/${guid}`);
    return response.data;
  }

  public async updateUser({ guid, user }: IUpdateUserParams): Promise<any> {
    const response = await this.axiosInstance.put(`/${guid}`, user);
    return response.data;
  }

  public async updatePassword({
    guid,
    passwords,
  }: IUpdatePasswordParams): Promise<any> {
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
