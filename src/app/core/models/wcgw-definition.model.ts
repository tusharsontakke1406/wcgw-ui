export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';
export type DefinitionStatus = 'Draft' | 'Published';

export interface WcgwCustomParam {
  id: string;
  key: string;
  value: string;
}

export interface WcgwDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  wcgwEntity: string;
  severity: Severity;
  status: DefinitionStatus;
  version: number;
  customParams: WcgwCustomParam[];
  createdAt: string;
  updatedAt: string;
}
