export interface IApiResponseProps<T> {
  message?: string;
  data?: T;
}

export interface IApiResponse<T> {
  success: true;
  message?: string;
  data?: T;
}

export interface IApiErrorResponseProps {
  message: string;
}

export interface IApiErrorResponse {
  success: false;
  message: string;
}
