export type  FieldType = 'input' | 'select';

export interface Field {
  label: string;
  prop: string;
  type: FieldType;
  options?: Array<{ value: string, label: string }>;
}

export interface Fields extends Partial<Field> {
  children?: Fields[];
}
