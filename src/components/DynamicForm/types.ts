export type  FieldType = 'input' | 'select';

export interface Field {
  prop: string;
  label: string;
  show?: bigint;
  labelWidth: string;
  // ----------------------------------------------------------------
  type: FieldType;
  options?: Array<{ value: string, label: string }>;
}

export interface Fields extends Partial<Field> {
  children?: Fields[];
}
