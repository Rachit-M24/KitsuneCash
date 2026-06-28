import type { Ref } from "react";
import type { FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";

import {
  FORM_FIELD_CLASS,
  mergeInputClassName,
  toInputValue,
} from "../DynamicForm.utils";
import type { DynamicFieldComponentProps } from "../DynamicForm.types";

export function TextField<TFieldValues extends FieldValues>({
  config,
  field,
  hasError,
}: DynamicFieldComponentProps<TFieldValues>) {
  const inputType =
    config.type === "text" ? (config.inputType ?? "text") : "text";

  return (
    <Input
      {...field}
      ref={field.ref as Ref<HTMLInputElement>}
      type={inputType}
      value={toInputValue(field.value)}
      onChange={(event) => field.onChange(event.target.value)}
      placeholder={config.resolvedPlaceholder}
      disabled={config.resolvedDisabled}
      autoComplete={
        config.type === "text" ? config.autoComplete : undefined
      }
      aria-invalid={hasError}
      className={mergeInputClassName(
        FORM_FIELD_CLASS,
        config.resolvedInputClassName,
        hasError,
      )}
      {...config.resolvedProps}
    />
  );
}
