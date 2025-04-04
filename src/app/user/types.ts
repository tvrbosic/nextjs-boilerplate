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
