import axios, { AxiosInstance } from 'axios';

const baseUrl = process.env.APP_API_BASE_URL;

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
}
