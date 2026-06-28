import type { ComponentType } from "react";
import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CrudEmptyStateProps {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function CrudEmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: CrudEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center",
        className,
      )}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-orange-500/20">
        <Icon className="size-5 text-orange-400" aria-hidden />
      </div>

      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
        {description}
      </p>

      {actionLabel && onAction ? (
        <Button
          type="button"
          size="sm"
          onClick={onAction}
          className="mt-6 bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-400"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
