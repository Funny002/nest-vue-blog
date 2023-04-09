export type  FieldType = 'text' | 'password' | 'code';

export interface Field {
  prop: string;
  show?: bigint;
  label?: string;
  labelWidth?: string;
  // ----------------------------------------------------------------
  type: FieldType;
  placeholder?: string;
  options?: Array<{ value: string, label: string }>;
}

export interface Fields extends Partial<Field> {
  children?: Fields[];
}
