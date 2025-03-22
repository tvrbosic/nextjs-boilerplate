export type TSubmitRegisterFormAction = {
  message?: string;
  errors?: {
    api?: string[];
    email?: string[];
    password?: string[];
    passwordConfirm?: string[];
    firstName?: string[];
    lastName?: string[];
  };
};

export interface IRegisterForm {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

export type TSubmitLoginFormAction = {
  email?: string;
  password?: string;
  errors?: {
    api?: string[];
    email?: string[];
    password?: string[];
  };
};

export type TSubmitForgotPasswordFormAction = {
  message?: string;
  errors?: {
    api?: string[];
    email?: string[];
  };
};

export type TSubmitResetPasswordFormAction = {
  message?: string;
  errors?: {
    api?: string[];
    newPassword?: string[];
    newPasswordConfirm?: string[];
  };
};
