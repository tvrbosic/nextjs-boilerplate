// LIB
import axios, { AxiosInstance } from 'axios';

// TYPES
import {
  ILoginParams,
  IRegisterParams,
  IForgotPasswordParams,
  IResetPasswordParams,
} from '@/api-clients/auth/types';
import { IApiSuccessResponse } from '@/utility/response/type';
import { User } from '@prisma/client';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export class AuthApiClient {
  static #instance: AuthApiClient;
  private axiosInstance: AxiosInstance;

  // Private to prevent direct construction calls with the `new` operator.
  private constructor() {
    // Create axios instance
    this.axiosInstance = axios.create({
      baseURL: `${baseUrl}/auth`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Instance getter, that lets clients access the unique singleton instance.
  public static get instance(): AuthApiClient {
    if (!AuthApiClient.#instance) {
      AuthApiClient.#instance = new AuthApiClient();
    }

    return AuthApiClient.#instance;
  }

  public async login(
    params: ILoginParams
  ): Promise<IApiSuccessResponse<{ token: string }>> {
    const response = await this.axiosInstance.post<
      IApiSuccessResponse<{ token: string }>
    >('/login', params);
    return response.data;
  }

  public async verify(): Promise<IApiSuccessResponse<{ token: string }>> {
    const response =
      await this.axiosInstance.get<IApiSuccessResponse<{ token: string }>>(
        '/verify'
      );
    return response.data;
  }

  public async register(params: IRegisterParams) {
    const response = await this.axiosInstance.post('/register', params);
    return response.data;
  }

  public async logout() {
    const response = await this.axiosInstance.post('/logout', {});
    return response.data;
  }

  public async forgotPassword(params: IForgotPasswordParams) {
    const response = await this.axiosInstance.post('/forgot-password', params);
    return response.data;
  }

  public async resetPassword(params: IResetPasswordParams) {
    const { token, newPassword, newPasswordConfirm } = params;

    const response = await this.axiosInstance.patch(
      `/reset-password/${token}`,
      { newPassword, newPasswordConfirm }
    );

    return response.data;
  }
}
