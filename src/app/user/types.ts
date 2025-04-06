export type TSubmitUpdateProfileFormAction = {
  email?: string;
  firstName?: string;
  lastName?: string;
  errors?: {
    api?: string[];
    email?: string[];
    firstName?: string[];
    lastName?: string[];
  };
};

export type TSubmitUpdatePasswordFormAction = {
  errors?: {
    api?: string[];
    newPassword?: string[];
    newPasswordConfirm?: string[];
    oldPassword?: string[];
  };
};
