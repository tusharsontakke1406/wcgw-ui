import { Injectable, signal } from '@angular/core';
import { WcgwDefinition, DefinitionStatus } from '../models/wcgw-definition.model';

const SEED: WcgwDefinition[] = [
  {
    id: 'def1',
    name: 'Risky Work Request — Overloaded Assignment',
    description: 'Work request assigned to an auditor already exceeding capacity thresholds',
    category: 'Operational',
    wcgwEntity: 'Task',
    severity: 'High',
    status: 'Published',
    version: 2,
    customParams: [
      { id: 'p1', key: 'capacity_threshold', value: '80%' },
      { id: 'p2', key: 'escalation_days', value: '3' }
    ],
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'def2',
    name: 'Risky Work Request — Compliance Gap',
    description: 'Work request that may result in regulatory non-compliance',
    category: 'Compliance',
    wcgwEntity: 'Obligation',
    severity: 'Critical',
    status: 'Published',
    version: 1,
    customParams: [
      { id: 'p3', key: 'regulation_code', value: 'SOX-404' }
    ],
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-20T11:00:00Z'
  },
  {
    id: 'def3',
    name: 'Risky Work Request — Resource Burnout',
    description: 'Signs of auditor burnout from consecutive high-pressure assignments',
    category: 'HR',
    wcgwEntity: 'Party',
    severity: 'High',
    status: 'Draft',
    version: 1,
    customParams: [
      { id: 'p4', key: 'consecutive_days', value: '10' }
    ],
    createdAt: '2024-04-10T08:00:00Z',
    updatedAt: '2024-04-10T08:00:00Z'
  },
  {
    id: 'def4',
    name: 'Risky Work Request — Quality Failure',
    description: 'Work request with high probability of quality issues or rework',
    category: 'Quality',
    wcgwEntity: 'Activity',
    severity: 'Medium',
    status: 'Published',
    version: 3,
    customParams: [
      { id: 'p5', key: 'quality_threshold', value: '95%' },
      { id: 'p6', key: 'rework_limit', value: '2' }
    ],
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-05-01T16:00:00Z'
  }
];

@Injectable({ providedIn: 'root' })
export class WcgwDefinitionService {
  private _defs = signal<WcgwDefinition[]>(SEED);
  readonly definitions = this._defs.asReadonly();

  add(def: Omit<WcgwDefinition, 'id' | 'createdAt' | 'updatedAt' | 'version'>): void {
    const now = new Date().toISOString();
    this._defs.update(list => [
      ...list,
      { ...def, id: 'def' + Date.now(), createdAt: now, updatedAt: now, version: 1 }
    ]);
  }

  publish(id: string): void {
    this._defs.update(list =>
      list.map(d =>
        d.id === id
          ? { ...d, status: 'Published' as DefinitionStatus, updatedAt: new Date().toISOString() }
          : d
      )
    );
  }
}
