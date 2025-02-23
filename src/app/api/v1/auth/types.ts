export interface IPatchResetPasswordParams {
  params: Promise<{
    resetToken: string;
  }>;
}
