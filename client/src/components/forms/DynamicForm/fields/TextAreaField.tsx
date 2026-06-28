import type { Ref } from "react";
import type { FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

import { mergeInputClassName, toInputValue } from "../DynamicForm.utils";
import type { DynamicFieldComponentProps } from "../DynamicForm.types";

export function TextAreaField<TFieldValues extends FieldValues>({
  config,
  field,
  hasError,
}: DynamicFieldComponentProps<TFieldValues>) {
  return (
    <textarea
      {...field}
      ref={field.ref as Ref<HTMLTextAreaElement>}
      value={toInputValue(field.value)}
      onChange={(event) => field.onChange(event.target.value)}
      placeholder={config.resolvedPlaceholder}
      disabled={config.resolvedDisabled}
      rows={config.type === "textarea" ? config.rows ?? 4 : 4}
      maxLength={config.type === "textarea" ? config.maxLength : undefined}
      aria-invalid={hasError}
      className={cn(
        mergeInputClassName(
          "flex w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
          config.resolvedInputClassName,
          hasError,
        ),
        "min-h-24 border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-500 focus-visible:border-orange-500/60 focus-visible:ring-3 focus-visible:ring-orange-500/25",
      )}
      {...config.resolvedProps}
    />
  );
}
