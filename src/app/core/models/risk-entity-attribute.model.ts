import { AttributeDataType } from './enums/attribute-data-type.enum';
import { SensitivityClassification } from './enums/sensitivity-classification.enum';

export interface RiskEntityAttribute {
  id: string;
  name: string;
  dataType: AttributeDataType;
  description?: string;
  isRequired: boolean;
  isPrimaryKey: boolean;
  sensitivityClassification: SensitivityClassification;
  defaultValue?: string;
  validationPattern?: string;
}
