import type { Ref } from "react";
import type { FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { FORM_FIELD_CLASS, mergeInputClassName, toInputValue } from "../DynamicForm.utils";
import type { DynamicFieldComponentProps } from "../DynamicForm.types";

export function DateField<TFieldValues extends FieldValues>({
  config,
  field,
  hasError,
}: DynamicFieldComponentProps<TFieldValues>) {
  return (
    <Input
      {...field}
      ref={field.ref as Ref<HTMLInputElement>}
      type="date"
      value={toInputValue(field.value)}
      onChange={(event) => field.onChange(event.target.value)}
      disabled={config.resolvedDisabled}
      min={config.type === "date" ? config.min : undefined}
      max={config.type === "date" ? config.max : undefined}
      aria-invalid={hasError}
      className={mergeInputClassName(
        cn(FORM_FIELD_CLASS, "[color-scheme:dark]"),
        config.resolvedInputClassName,
        hasError,
      )}
      {...config.resolvedProps}
    />
  );
}
