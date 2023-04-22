export type FieldsAlign = 'left' | 'right' | 'center';

export interface Fields {
  slot?: string;
  prop?: string;
  label: string;
  type?: string;
  width?: string;
  minWidth?: string;
  align?: FieldsAlign;
  headerAlign?: FieldsAlign;
  sortable?: 'custom' | boolean;
  showOverflowTooltip?: boolean;
}

export type handleCallback<T = any> = (index: number, value: T) => void

// =================================================================================
export interface ButtonFieldItem {
  icon?: any;
  label: string,
  name?: string;
  text?: boolean;
  link?: boolean;
  color?: string;
  plain?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
}

export interface ButtonField {
  type: 'button';
  max?: number;
  group?: boolean;
  hasIcon?: boolean;
  hasText?: boolean;
  click?: handleCallback<string>;
  options: (string | ButtonFieldItem)[];
}

// =================================================================================
export interface DateField {
  type: 'date';
  prop: string;
  format?: string;
}

// =================================================================================
export interface StatusField {
  type: 'status';
  activeIcon?: any;
  activeValue?: any;
  activeText?: string;
  //
  inactiveIcon?: any;
  inactiveValue?: any;
  inactiveText?: string;
  //
  loading?: boolean;
  disabled?: boolean;
  inlinePrompt?: boolean;
  change?: handleCallback;
}

export type FieldsItem = Fields & (ButtonField | DateField | StatusField | {})
