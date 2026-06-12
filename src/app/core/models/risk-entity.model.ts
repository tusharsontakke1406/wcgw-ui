import { EntityStatus } from './enums/entity-status.enum';
import { ComplianceTag } from './enums/compliance-tag.enum';
import { RiskEntityAttribute } from './risk-entity-attribute.model';

export interface RiskEntity {
  id: string;
  name: string;
  type: string;
  description?: string;
  primaryKey: string;
  dataOwner: string;
  complianceTag: ComplianceTag;
  dataSourceRegistryId: string;
  attributes: RiskEntityAttribute[];
  status: EntityStatus;
  createdAt: string;
  updatedAt: string;
  version: number;
}
