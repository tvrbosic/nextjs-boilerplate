// ============================| GET |============================ //
export interface IGetUserParams {
  guid: string;
}

// ============================| POST |============================ //
export interface ICreateUserParams {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
}

// ============================| PACH |============================ //
export interface IPartialUpdateUserParams {
  guid: string;
  user: any;
}

export interface IPartialUpdateUserResponse {
  email: string;
  firstName: string;
  lastName: string;
}

export interface IPostUserParams {
  guid: string;
  user: any;
}

export interface IUploadAvatarParams {
  guid: string; // User GUID
  file: File; // File to be uploaded
}

export interface IUpdatePasswordParams {
  guid: string;
  passwords: {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  };
}

export interface IDeleteUserParams {
  guid: string;
}
