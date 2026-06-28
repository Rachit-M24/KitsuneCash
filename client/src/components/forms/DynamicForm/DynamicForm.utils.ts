import type { FieldColSpan, FieldConfig, ResolvedFieldConfig } from "./DynamicForm.types";

export const FORM_FIELD_CLASS =
  "h-10 border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-500 focus-visible:border-orange-500/60 focus-visible:ring-orange-500/25";

export const FORM_TEXTAREA_CLASS =
  "min-h-24 border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-500 focus-visible:border-orange-500/60 focus-visible:ring-orange-500/25";

export const FORM_SELECT_CLASS =
  "h-10 border-white/10 bg-white/[0.03] text-white focus-visible:border-orange-500/60 focus-visible:ring-orange-500/25";

export const FORM_LABEL_CLASS = "text-zinc-300";

export const DEFAULT_EMOJIS = [
  "💰",
  "🏠",
  "🍔",
  "🚗",
  "✈️",
  "🛒",
  "💊",
  "🎮",
  "📱",
  "👕",
  "🎓",
  "🐾",
  "💡",
  "🎁",
  "☕",
  "🏋️",
  "🎬",
  "📚",
  "💼",
  "🌿",
  "⚡",
  "🔧",
  "🎵",
  "🏥",
];

export function resolveFieldConfig<T extends FieldConfig>(
  config: T,
  formDisabled = false,
): ResolvedFieldConfig {
  const { overrides } = config;

  return {
    ...config,
    label: overrides?.label ?? config.label,
    placeholder: overrides?.placeholder ?? config.placeholder,
    description: overrides?.description ?? config.description,
    disabled: overrides?.disabled ?? config.disabled ?? formDisabled,
    hidden: overrides?.hidden ?? config.hidden ?? false,
    resolvedLabel: overrides?.label ?? config.label,
    resolvedPlaceholder: overrides?.placeholder ?? config.placeholder,
    resolvedDescription: overrides?.description ?? config.description,
    resolvedDisabled: overrides?.disabled ?? config.disabled ?? formDisabled,
    resolvedHidden: overrides?.hidden ?? config.hidden ?? false,
    resolvedClassName: overrides?.className,
    resolvedInputClassName: overrides?.inputClassName,
    resolvedIcon: overrides?.icon,
    resolvedProps: overrides?.props,
  } as ResolvedFieldConfig;
}

export function getColSpanClass(colSpan?: FieldColSpan): string {
  switch (colSpan) {
    case 2:
      return "sm:col-span-2";
    case "full":
      return "col-span-full";
    default:
      return "";
  }
}

export function getSubmitLabel(mode: "create" | "update" = "create"): string {
  return mode === "update" ? "Save changes" : "Create";
}

export function getFormGridClass(layout: "single" | "two-column" = "single"): string {
  if (layout === "two-column") {
    return "grid grid-cols-1 gap-5 sm:grid-cols-2";
  }

  return "grid grid-cols-1 gap-5";
}

export function mergeInputClassName(
  base: string,
  override?: string,
  hasError?: boolean,
): string {
  const parts = [base, override];

  if (hasError) {
    parts.push("border-destructive/60 ring-destructive/20");
  }

  return parts.filter(Boolean).join(" ");
}

export function toInputValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

export function toNumberValue(value: unknown): number | "" {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? "" : parsed;
}
