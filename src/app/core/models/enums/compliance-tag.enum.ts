export enum ComplianceTag {
  GDPR = 'GDPR',
  CCPA = 'CCPA',
  HIPAA = 'HIPAA',
  SOX = 'SOX',
  PCI_DSS = 'PCI_DSS',
  NONE = 'NONE'
}

export const COMPLIANCE_TAG_LABELS: Record<ComplianceTag, string> = {
  [ComplianceTag.GDPR]: 'GDPR',
  [ComplianceTag.CCPA]: 'CCPA',
  [ComplianceTag.HIPAA]: 'HIPAA',
  [ComplianceTag.SOX]: 'SOX',
  [ComplianceTag.PCI_DSS]: 'PCI-DSS',
  [ComplianceTag.NONE]: 'None'
};
