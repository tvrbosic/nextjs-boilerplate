export interface ICreateUserParams {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
}

export interface IGetUserParams {
  guid: string;
}

export interface IUpdateUserParams {
  guid: string;
  user: any;
}

export interface IUpdatePasswordParams {
  guid: string;
  passwords: {
    oldPassword: string;
    newPassword: string;
  };
}

export interface IDeleteUserParams {
  guid: string;
}
