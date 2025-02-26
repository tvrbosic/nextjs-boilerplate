// ====================================| COMMON |==================================== //
export interface IOptionalMessageProps {
  message?: string;
}

export interface IOptionalMessageAndDataProps<T> {
  message?: string;
  data?: T;
}

// ====================================| SUCCESS |==================================== //
export interface IApiSuccessResponseProps<T> {
  status?: number;
  message?: string;
  data?: T;
}

export interface IApiSuccessResponse<T> {
  success: true;
  message?: string;
  data?: T;
}

// ====================================| ERROR |==================================== //
export interface IApiErrorResponseProps {
  status: number;
  message: string;
}

export interface IApiErrorResponse {
  success: false;
  message: string;
}
