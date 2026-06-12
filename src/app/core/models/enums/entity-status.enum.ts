export enum EntityStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  DEPRECATED = 'DEPRECATED',
  ARCHIVED = 'ARCHIVED'
}

export const ENTITY_STATUS_LABELS: Record<EntityStatus, string> = {
  [EntityStatus.DRAFT]: 'Draft',
  [EntityStatus.PENDING_APPROVAL]: 'Pending Approval',
  [EntityStatus.APPROVED]: 'Approved',
  [EntityStatus.PUBLISHED]: 'Published',
  [EntityStatus.DEPRECATED]: 'Deprecated',
  [EntityStatus.ARCHIVED]: 'Archived'
};
