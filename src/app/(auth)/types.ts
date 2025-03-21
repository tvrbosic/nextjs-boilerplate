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
