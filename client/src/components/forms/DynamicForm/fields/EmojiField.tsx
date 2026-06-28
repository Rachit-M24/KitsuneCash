import type { FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

import { DEFAULT_EMOJIS, toInputValue } from "../DynamicForm.utils";
import type { DynamicFieldComponentProps } from "../DynamicForm.types";

export function EmojiField<TFieldValues extends FieldValues>({
  config,
  field,
  hasError,
}: DynamicFieldComponentProps<TFieldValues>) {
  const emojis =
    config.type === "emoji" ? (config.emojis ?? DEFAULT_EMOJIS) : [];

  const selected = toInputValue(field.value);

  return (
    <div
      role="listbox"
      aria-label={config.resolvedLabel ?? "Emoji picker"}
      aria-invalid={hasError}
      className={cn(
        "grid grid-cols-8 gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] p-2 sm:grid-cols-10",
        hasError && "border-destructive/60 ring-1 ring-destructive/20",
        config.resolvedDisabled && "pointer-events-none opacity-50",
      )}
    >
      {emojis.map((emoji) => {
        const isSelected = selected === emoji;

        return (
          <button
            key={emoji}
            type="button"
            role="option"
            aria-selected={isSelected}
            disabled={config.resolvedDisabled}
            onClick={() => field.onChange(emoji)}
            onBlur={field.onBlur}
            className={cn(
              "flex size-9 items-center justify-center rounded-md text-lg transition-all outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-orange-500/50",
              isSelected &&
                "scale-105 bg-orange-500/20 ring-1 ring-orange-500/40",
            )}
          >
            <span aria-hidden>{emoji}</span>
            <span className="sr-only">{emoji}</span>
          </button>
        );
      })}
    </div>
  );
}
