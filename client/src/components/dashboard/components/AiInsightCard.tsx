import { Sparkles } from "lucide-react";
import type { CategoryBudget } from "@/types/dashboardTypes/categoryBudgetDto.types";
import { cn } from "@/lib/utils";

interface AiInsightCardProps {
  budgetSummary: CategoryBudget[];
  className?: string;
}

function getInsightMessage(budgetSummary: CategoryBudget[]) {
  if (budgetSummary.length === 0) {
    return "Start tracking budgets to unlock personalized spending insights powered by AI.";
  }

  const topCategory = budgetSummary.reduce((highest, current) =>
    current.spent / Math.max(current.budget, 1) >
    highest.spent / Math.max(highest.budget, 1)
      ? current
      : highest,
  );

  const utilization = Math.round(
    (topCategory.spent / Math.max(topCategory.budget, 1)) * 100,
  );

  return `You have spent ${utilization}% of your ${topCategory.categoryName} budget this month.`;
}

export function AiInsightCard({ budgetSummary, className }: AiInsightCardProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent p-6 sm:p-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-8 size-40 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-orange-200">
            <Sparkles className="size-3.5" aria-hidden />
            AI Insights
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Your financial pulse
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-orange-50/80 sm:text-base">
            {getInsightMessage(budgetSummary)}
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-center self-start rounded-2xl bg-orange-500/15 p-4 ring-1 ring-orange-400/30">
          <Sparkles className="size-8 text-orange-300" aria-hidden />
        </div>
      </div>
    </section>
  );
}
