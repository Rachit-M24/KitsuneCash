import type { ComponentType } from "react";
import type { FieldValues } from "react-hook-form";

import {
  DateField,
  EmojiField,
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
} from "./fields";
import type {
  DynamicFieldComponentProps,
  FieldType,
  ResolvedFieldConfig,
} from "./DynamicForm.types";

type FieldRendererMap = {
  [K in FieldType]: ComponentType<DynamicFieldComponentProps<FieldValues>>;
};

const fieldRendererMap: FieldRendererMap = {
  text: TextField,
  number: NumberField,
  textarea: TextAreaField,
  select: SelectField,
  date: DateField,
  emoji: EmojiField,
};

export function renderField<TFieldValues extends FieldValues>(
  config: ResolvedFieldConfig<TFieldValues>,
  props: Omit<DynamicFieldComponentProps<TFieldValues>, "config">,
) {
  const Component = fieldRendererMap[config.type];

  if (!Component) {
    return null;
  }

  return <Component config={config} {...props} />;
}

export function getFieldRenderer(type: FieldType) {
  return fieldRendererMap[type];
}
