import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-orange-500/10 ring-1 ring-orange-500/20">
        <Icon className="size-6 text-orange-400" aria-hidden />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
      <Button
        type="button"
        size="sm"
        className="mt-6 bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-400"
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  );
}
