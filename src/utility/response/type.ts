export interface IApiResponseProps<T> {
  status: number;
  message?: string;
  data?: T;
}

export interface IApiResponse<T> {
  success: true;
  message?: string;
  data?: T;
}

export interface IApiErrorResponseProps {
  status: number;
  message: string;
}

export interface IApiErrorResponse {
  success: false;
  message: string;
}
