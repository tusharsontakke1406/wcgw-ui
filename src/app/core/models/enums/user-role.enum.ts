export enum UserRole {
  ADMIN = 'ADMIN',
  DATA_OWNER = 'DATA_OWNER',
  DATA_STEWARD = 'DATA_STEWARD',
  APPROVER = 'APPROVER',
  VIEWER = 'VIEWER'
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Admin',
  [UserRole.DATA_OWNER]: 'Data Owner',
  [UserRole.DATA_STEWARD]: 'Data Steward',
  [UserRole.APPROVER]: 'Approver',
  [UserRole.VIEWER]: 'Viewer'
};
