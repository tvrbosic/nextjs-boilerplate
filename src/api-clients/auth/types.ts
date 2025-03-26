export interface ILoginParams {
  email: string;
  password: string;
}

export interface IRegisterParams {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

export interface IForgotPasswordParams {
  email: string;
}

export interface IResetPasswordParams {
  token: string;
  newPassword: string;
  newPasswordConfirm: string;
}
