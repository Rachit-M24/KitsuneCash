import type { Ref } from "react";
import type { FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

import { mergeInputClassName, toInputValue } from "../DynamicForm.utils";
import type { DynamicFieldComponentProps } from "../DynamicForm.types";

export function SelectField<TFieldValues extends FieldValues>({
  config,
  field,
  hasError,
}: DynamicFieldComponentProps<TFieldValues>) {
  if (config.type !== "select") {
    return null;
  }

  return (
    <select
      {...field}
      ref={field.ref as Ref<HTMLSelectElement>}
      value={toInputValue(field.value)}
      onChange={(event) => field.onChange(event.target.value)}
      disabled={config.resolvedDisabled}
      aria-invalid={hasError}
      className={cn(
        mergeInputClassName(
          "h-10 w-full appearance-none rounded-lg border px-3 text-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
          config.resolvedInputClassName,
          hasError,
        ),
        "border-white/10 bg-white/[0.03] text-white focus-visible:border-orange-500/60 focus-visible:ring-3 focus-visible:ring-orange-500/25",
      )}
      {...config.resolvedProps}
    >
      {config.emptyOption ? (
        <option
          value={config.emptyOption.value}
          disabled={config.emptyOption.disabled}
        >
          {config.emptyOption.label}
        </option>
      ) : null}
      {config.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className="bg-zinc-900 text-white"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
