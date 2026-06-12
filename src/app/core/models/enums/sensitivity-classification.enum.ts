export enum SensitivityClassification {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  CONFIDENTIAL = 'CONFIDENTIAL',
  RESTRICTED = 'RESTRICTED',
  TOP_SECRET = 'TOP_SECRET'
}

export const SENSITIVITY_CLASSIFICATION_LABELS: Record<SensitivityClassification, string> = {
  [SensitivityClassification.PUBLIC]: 'Public',
  [SensitivityClassification.INTERNAL]: 'Internal',
  [SensitivityClassification.CONFIDENTIAL]: 'Confidential',
  [SensitivityClassification.RESTRICTED]: 'Restricted',
  [SensitivityClassification.TOP_SECRET]: 'Top Secret'
};
