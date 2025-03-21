export type TSubmitForgotPasswordFormAction = {
  message?: string;
  errors?: {
    api?: string[];
    email?: string[];
  };
};
