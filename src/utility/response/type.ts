// ====================================| COMMON |==================================== //
export interface IOptionalMessageProps {
  message?: string;
}

export interface IOptionalMessageAndDataProps<T = undefined> {
  message?: string;
  data?: T;
}

// ====================================| SUCCESS |==================================== //
export interface IApiSuccessResponseProps<T = undefined> {
  status?: number;
  message?: string;
  data?: T;
}

export interface IApiSuccessResponse<T = undefined> {
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
