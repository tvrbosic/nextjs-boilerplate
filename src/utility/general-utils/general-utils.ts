export function maskObjectSensitiveFields(
  payload: Record<string, any>
): Record<string, any> {
  const maskedPayload = { ...payload };

  const sensitiveFields = [
    'password',
    'newPassword',
    'oldPassword',
    'newPasswordConfirm',
  ];

  for (const field of sensitiveFields) {
    if (field in maskedPayload) {
      maskedPayload[field] = '**********';
    }
  }

  return maskedPayload;
}
