export enum AttributeDataType {
  STRING = 'STRING',
  INTEGER = 'INTEGER',
  DECIMAL = 'DECIMAL',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  DATETIME = 'DATETIME',
  JSON = 'JSON',
  ENUM = 'ENUM'
}

export const ATTRIBUTE_DATA_TYPE_LABELS: Record<AttributeDataType, string> = {
  [AttributeDataType.STRING]: 'String',
  [AttributeDataType.INTEGER]: 'Integer',
  [AttributeDataType.DECIMAL]: 'Decimal',
  [AttributeDataType.BOOLEAN]: 'Boolean',
  [AttributeDataType.DATE]: 'Date',
  [AttributeDataType.DATETIME]: 'DateTime',
  [AttributeDataType.JSON]: 'JSON',
  [AttributeDataType.ENUM]: 'Enum'
};
