import type { Ref } from "react";
import type { LucideIcon } from "lucide-react";
import type { FieldValues, Path } from "react-hook-form";
import type { ZodTypeAny } from "zod";

export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "date"
  | "emoji";

export type FormMode = "create" | "update";

export type FieldColSpan = 1 | 2 | "full";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FieldOverrides {
  placeholder?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
  inputClassName?: string;
  icon?: LucideIcon;
  validationMessage?: string;
  props?: Record<string, unknown>;
}

interface BaseFieldConfig<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
  colSpan?: FieldColSpan;
  overrides?: FieldOverrides;
}

export interface TextFieldConfig<TFieldValues extends FieldValues = FieldValues>
  extends BaseFieldConfig<TFieldValues> {
  type: "text";
  inputType?: "text" | "email" | "password" | "url" | "tel";
  autoComplete?: string;
}

export interface NumberFieldConfig<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseFieldConfig<TFieldValues> {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
}

export interface TextAreaFieldConfig<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseFieldConfig<TFieldValues> {
  type: "textarea";
  rows?: number;
  maxLength?: number;
}

export interface SelectFieldConfig<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseFieldConfig<TFieldValues> {
  type: "select";
  options: SelectOption[];
  emptyOption?: SelectOption;
}

export interface DateFieldConfig<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseFieldConfig<TFieldValues> {
  type: "date";
  min?: string;
  max?: string;
}

export interface EmojiFieldConfig<
  TFieldValues extends FieldValues = FieldValues,
> extends BaseFieldConfig<TFieldValues> {
  type: "emoji";
  emojis?: string[];
}

export type FieldConfig<TFieldValues extends FieldValues = FieldValues> =
  | TextFieldConfig<TFieldValues>
  | NumberFieldConfig<TFieldValues>
  | TextAreaFieldConfig<TFieldValues>
  | SelectFieldConfig<TFieldValues>
  | DateFieldConfig<TFieldValues>
  | EmojiFieldConfig<TFieldValues>;

export type ResolvedFieldConfig<TFieldValues extends FieldValues = FieldValues> =
  FieldConfig<TFieldValues> & {
    resolvedLabel?: string;
    resolvedPlaceholder?: string;
    resolvedDescription?: string;
    resolvedDisabled: boolean;
    resolvedHidden: boolean;
    resolvedClassName?: string;
    resolvedInputClassName?: string;
    resolvedIcon?: LucideIcon;
    resolvedProps?: Record<string, unknown>;
  };

export interface DynamicFormConfig<TFieldValues extends FieldValues> {
  fields: FieldConfig<TFieldValues>[];
  defaultValues?: Partial<TFieldValues>;
  schema?: ZodTypeAny;
  onSubmit: (values: TFieldValues) => void | Promise<void>;
  mode?: FormMode;
  loading?: boolean;
  disabled?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  className?: string;
  formClassName?: string;
  layout?: "single" | "two-column";
  showFooter?: boolean;
  id?: string;
}

export interface DynamicFormProps<TFieldValues extends FieldValues>
  extends DynamicFormConfig<TFieldValues> {}

export interface DynamicFieldComponentProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  config: ResolvedFieldConfig<TFieldValues>;
  field: {
    name: string;
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    ref: Ref<HTMLElement>;
  };
  hasError: boolean;
}
