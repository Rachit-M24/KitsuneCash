import type { ReactNode } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CrudToolbarProps {
  title?: string;
  description?: string;
  createLabel?: string;
  onCreate?: () => void;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function CrudToolbar({
  title,
  description,
  createLabel = "Create",
  onCreate,
  actions,
  children,
  className,
}: CrudToolbarProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {(title || description) && (
          <div className="min-w-0 space-y-1">
            {title ? (
              <h2 className="text-base font-semibold tracking-tight text-white">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-sm text-zinc-400">{description}</p>
            ) : null}
          </div>
        )}

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
          {onCreate ? (
            <Button
              type="button"
              size="sm"
              onClick={onCreate}
              className="bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-400"
            >
              <Plus className="size-4" aria-hidden />
              {createLabel}
            </Button>
          ) : null}
        </div>
      </div>

      {children}
    </div>
  );
}
