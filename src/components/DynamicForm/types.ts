export type  FieldType = 'text' | 'password' | 'code';

export interface Field {
  click?: any;
  prop: string;
  show?: bigint;
  label?: string;
  labelWidth?: string;
  // ----------------------------------------------------------------
  slot?: string;
  type: FieldType;
  placeholder?: string;
  options?: Array<{ value: string, label: string }>;
  // ----------------------------------------------------------------
  span?: number;
  push?: number;
  pull?: number;
  offset?: number;
}

export interface Fields extends Partial<Field> {
  children?: Fields[];
}
