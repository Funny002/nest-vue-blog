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
  showOverflowTooltip?: boolean;
  sortable?: 'custom' | boolean;
}

export type handleCallback<T = any> = (row: any, value: T, index: number) => void

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

// =================================================================================
export interface IndexField {
  type: 'index',
  page: { pageCount: number; pageSize: number };
}

export interface TagsField {
  type: 'tags';
  name: string;
  hit: boolean;
  color: string;
  round: boolean;
  closable: boolean;
  effect: 'dark' | 'light' | 'plain';
  size: 'large' | 'default' | 'small' | '';
  types: 'primary' | 'success' | 'info' | 'warning' | 'danger'; // options[Name].type 优先级高
  options: { [Name: string]: string | { value: string, type: 'primary' | 'success' | 'info' | 'warning' | 'danger' } };

  click(row: any, value: string, $index: number, event: MouseEvent): void;

  close(row: any, value: string, $index: number, event: MouseEvent): void;
}

// =================================================================================
export type TableFieldsItem = Fields & (ButtonField | DateField | StatusField | IndexField | TagsField | {})
