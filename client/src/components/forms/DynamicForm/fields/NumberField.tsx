import type { Ref } from "react";
import type { FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { FORM_FIELD_CLASS, mergeInputClassName } from "../DynamicForm.utils";
import type { DynamicFieldComponentProps } from "../DynamicForm.types";

export function NumberField<TFieldValues extends FieldValues>({
  config,
  field,
  hasError,
}: DynamicFieldComponentProps<TFieldValues>) {
  const numericValue =
    typeof field.value === "number"
      ? field.value
      : field.value === undefined || field.value === null || field.value === ""
        ? ""
        : Number(field.value);

  return (
    <Input
      {...field}
      ref={field.ref as Ref<HTMLInputElement>}
      type="number"
      value={numericValue}
      onChange={(event) => {
        const next = event.target.value;
        field.onChange(next === "" ? undefined : Number(next));
      }}
      placeholder={config.resolvedPlaceholder}
      disabled={config.resolvedDisabled}
      min={config.type === "number" ? config.min : undefined}
      max={config.type === "number" ? config.max : undefined}
      step={config.type === "number" ? config.step : undefined}
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
