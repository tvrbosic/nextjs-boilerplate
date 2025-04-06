export function baseModelOmitFields() {
  return {
    createdAt: true,
    createdById: true,
    createdBy: true,
    usersCreated: true,
    updatedAt: true,
    updatedById: true,
    updatedBy: true,
    usersUpdated: true,
    isDeleted: true,
    deletedAt: true,
    deletedById: true,
    deletedBy: true,
    usersDeleted: true,
    actionsTaken: true,
  };
}

export function userOmitFields() {
  return {
    password: true,
    passwordResetToken: true,
    passwordResetExpiresAt: true,
  };
}
