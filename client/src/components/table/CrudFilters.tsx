import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

import type { CrudFilterConfig } from "@/hooks/table/useDataTable";

export interface CrudFiltersProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: CrudFilterConfig[];
  className?: string;
}

export function CrudFilters({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  className,
}: CrudFiltersProps) {
  const hasSearch = Boolean(onSearchChange);
  const hasFilters = filters.length > 0;

  if (!hasSearch && !hasFilters) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
        className,
      )}
    >
      {hasSearch ? (
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
            aria-hidden
          />
          <Input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-9 border-white/10 bg-white/[0.03] pl-9 text-white placeholder:text-zinc-500 focus-visible:border-orange-500/60 focus-visible:ring-orange-500/25"
          />
          {searchValue ? (
            <button
              type="button"
              onClick={() => onSearchChange?.("")}
              className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>
      ) : null}

      {filters.map((filter) => (
        <div key={filter.id} className="min-w-[140px]">
          <label htmlFor={filter.id} className="sr-only">
            {filter.label}
          </label>
          <Select
            id={filter.id}
            value={filter.value ?? ""}
            onChange={(event) => filter.onChange?.(event.target.value)}
            className="h-9 border-white/10 bg-white/[0.03] text-sm text-white focus-visible:border-orange-500/60 focus-visible:ring-orange-500/25"
          >
            <option value="" className="bg-zinc-900">
              {filter.placeholder ?? filter.label}
            </option>
            {filter.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-zinc-900"
              >
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
}
