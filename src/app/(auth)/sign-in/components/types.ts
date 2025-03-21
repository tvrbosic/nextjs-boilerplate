export type TSubmitLoginFormAction = {
  email?: string;
  password?: string;
  errors?: {
    api?: string[];
    email?: string[];
    password?: string[];
  };
};
