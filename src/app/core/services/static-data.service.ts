import { Injectable, signal, computed } from '@angular/core';
import { RiskEntity } from '../models/risk-entity.model';
import { RiskEntityAttribute } from '../models/risk-entity-attribute.model';
import { EntityStatus } from '../models/enums/entity-status.enum';
import { ComplianceTag } from '../models/enums/compliance-tag.enum';
import { AttributeDataType } from '../models/enums/attribute-data-type.enum';
import { SensitivityClassification } from '../models/enums/sensitivity-classification.enum';

const SEED_ENTITIES: RiskEntity[] = [
  {
    id: 'e1',
    name: 'Customer Profile',
    type: 'Master Data',
    description: 'Core customer identity and demographic information used across all business lines.',
    primaryKey: 'customer_id',
    dataOwner: 'Alice Johnson',
    complianceTag: ComplianceTag.GDPR,
    dataSourceRegistryId: 'DSR-001',
    status: EntityStatus.PUBLISHED,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z',
    version: 3,
    attributes: [
      {
        id: 'a1',
        name: 'customer_id',
        dataType: AttributeDataType.STRING,
        description: 'Unique identifier for the customer',
        isRequired: true,
        isPrimaryKey: true,
        sensitivityClassification: SensitivityClassification.INTERNAL
      },
      {
        id: 'a2',
        name: 'full_name',
        dataType: AttributeDataType.STRING,
        description: 'Customer full legal name',
        isRequired: true,
        isPrimaryKey: false,
        sensitivityClassification: SensitivityClassification.CONFIDENTIAL
      },
      {
        id: 'a3',
        name: 'email',
        dataType: AttributeDataType.STRING,
        description: 'Primary contact email address',
        isRequired: true,
        isPrimaryKey: false,
        sensitivityClassification: SensitivityClassification.CONFIDENTIAL
      },
      {
        id: 'a4',
        name: 'date_of_birth',
        dataType: AttributeDataType.DATE,
        description: 'Customer date of birth',
        isRequired: false,
        isPrimaryKey: false,
        sensitivityClassification: SensitivityClassification.RESTRICTED
      }
    ]
  },
  {
    id: 'e2',
    name: 'Transaction Record',
    type: 'Transactional',
    description: 'Financial transaction records including amounts, timestamps and counterparties.',
    primaryKey: 'transaction_id',
    dataOwner: 'Bob Martinez',
    complianceTag: ComplianceTag.SOX,
    dataSourceRegistryId: 'DSR-002',
    status: EntityStatus.APPROVED,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-04-01T08:00:00Z',
    version: 2,
    attributes: [
      {
        id: 'a5',
        name: 'transaction_id',
        dataType: AttributeDataType.STRING,
        description: 'Unique transaction identifier',
        isRequired: true,
        isPrimaryKey: true,
        sensitivityClassification: SensitivityClassification.INTERNAL
      },
      {
        id: 'a6',
        name: 'amount',
        dataType: AttributeDataType.DECIMAL,
        description: 'Transaction amount in base currency',
        isRequired: true,
        isPrimaryKey: false,
        sensitivityClassification: SensitivityClassification.CONFIDENTIAL
      },
      {
        id: 'a7',
        name: 'transaction_date',
        dataType: AttributeDataType.DATETIME,
        description: 'Timestamp of the transaction',
        isRequired: true,
        isPrimaryKey: false,
        sensitivityClassification: SensitivityClassification.INTERNAL
      }
    ]
  },
  {
    id: 'e3',
    name: 'Credit Risk Score',
    type: 'Analytical',
    description: 'Computed credit risk scores and model outputs for risk assessment.',
    primaryKey: 'score_id',
    dataOwner: 'Carol Wei',
    complianceTag: ComplianceTag.CCPA,
    dataSourceRegistryId: 'DSR-003',
    status: EntityStatus.DRAFT,
    createdAt: '2024-05-10T11:00:00Z',
    updatedAt: '2024-05-10T11:00:00Z',
    version: 1,
    attributes: [
      {
        id: 'a8',
        name: 'score_id',
        dataType: AttributeDataType.STRING,
        isRequired: true,
        isPrimaryKey: true,
        sensitivityClassification: SensitivityClassification.INTERNAL
      },
      {
        id: 'a9',
        name: 'risk_score',
        dataType: AttributeDataType.DECIMAL,
        description: 'Numeric risk score between 0 and 1000',
        isRequired: true,
        isPrimaryKey: false,
        sensitivityClassification: SensitivityClassification.RESTRICTED
      },
      {
        id: 'a10',
        name: 'is_flagged',
        dataType: AttributeDataType.BOOLEAN,
        description: 'Whether the entity has been flagged for review',
        isRequired: true,
        isPrimaryKey: false,
        sensitivityClassification: SensitivityClassification.CONFIDENTIAL
      }
    ]
  },
  {
    id: 'e4',
    name: 'Patient Record',
    type: 'Master Data',
    description: 'Healthcare patient records containing medical history and personal health information.',
    primaryKey: 'patient_id',
    dataOwner: 'David Patel',
    complianceTag: ComplianceTag.HIPAA,
    dataSourceRegistryId: 'DSR-004',
    status: EntityStatus.PENDING_APPROVAL,
    createdAt: '2024-06-01T09:00:00Z',
    updatedAt: '2024-06-20T12:00:00Z',
    version: 1,
    attributes: [
      {
        id: 'a11',
        name: 'patient_id',
        dataType: AttributeDataType.STRING,
        isRequired: true,
        isPrimaryKey: true,
        sensitivityClassification: SensitivityClassification.RESTRICTED
      },
      {
        id: 'a12',
        name: 'diagnosis_code',
        dataType: AttributeDataType.STRING,
        description: 'ICD-10 diagnosis code',
        isRequired: false,
        isPrimaryKey: false,
        sensitivityClassification: SensitivityClassification.TOP_SECRET
      }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class StaticDataService {
  private _entities = signal<RiskEntity[]>(SEED_ENTITIES);

  readonly entities = this._entities.asReadonly();

  readonly entityCount = computed(() => this._entities().length);

  readonly publishedCount = computed(
    () => this._entities().filter(e => e.status === EntityStatus.PUBLISHED).length
  );

  readonly draftCount = computed(
    () => this._entities().filter(e => e.status === EntityStatus.DRAFT).length
  );

  getById(id: string): RiskEntity | undefined {
    return this._entities().find(e => e.id === id);
  }

  add(entity: Omit<RiskEntity, 'id' | 'createdAt' | 'updatedAt' | 'version'>): RiskEntity {
    const now = new Date().toISOString();
    const newEntity: RiskEntity = {
      ...entity,
      id: 'e' + Date.now(),
      createdAt: now,
      updatedAt: now,
      version: 1
    };
    this._entities.update(list => [...list, newEntity]);
    return newEntity;
  }

  update(id: string, patch: Partial<Omit<RiskEntity, 'id' | 'createdAt'>>): void {
    this._entities.update(list =>
      list.map(e =>
        e.id === id
          ? { ...e, ...patch, updatedAt: new Date().toISOString(), version: e.version + 1 }
          : e
      )
    );
  }

  delete(id: string): void {
    this._entities.update(list => list.filter(e => e.id !== id));
  }
}
