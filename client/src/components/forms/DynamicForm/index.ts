export { DynamicForm } from "./DynamicForm";
export { FormField } from "./FormField";
export { renderField, getFieldRenderer } from "./fieldRenderer";

export type {
  DynamicFormConfig,
  DynamicFormProps,
  DynamicFieldComponentProps,
  FieldConfig,
  FieldOverrides,
  FieldType,
  FormMode,
  ResolvedFieldConfig,
  SelectOption,
  TextFieldConfig,
  NumberFieldConfig,
  TextAreaFieldConfig,
  SelectFieldConfig,
  DateFieldConfig,
  EmojiFieldConfig,
} from "./DynamicForm.types";

export {
  DEFAULT_EMOJIS,
  FORM_FIELD_CLASS,
  FORM_LABEL_CLASS,
  FORM_SELECT_CLASS,
  FORM_TEXTAREA_CLASS,
  getColSpanClass,
  getFormGridClass,
  getSubmitLabel,
  mergeInputClassName,
  resolveFieldConfig,
  toInputValue,
  toNumberValue,
} from "./DynamicForm.utils";

export { useDynamicForm } from "@/hooks/forms/useDynamicForm";
