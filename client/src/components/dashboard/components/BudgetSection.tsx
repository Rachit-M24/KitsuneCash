import { Wallet } from "lucide-react";
import type { CategoryBudget } from "@/types/dashboardTypes/categoryBudgetDto.types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../utils/formatCurrency";
import { EmptyState } from "./EmptyState";

interface BudgetSectionProps {
  budgetSummary: CategoryBudget[];
}

function getBudgetHealth(spent: number, budget: number) {
  const utilization = budget > 0 ? (spent / budget) * 100 : 0;

  if (utilization >= 90) {
    return {
      label: "Critical",
      barClass: "bg-rose-500",
      badgeClass: "bg-rose-500/15 text-rose-300 ring-rose-500/25",
    };
  }

  if (utilization >= 70) {
    return {
      label: "Watch",
      barClass: "bg-amber-500",
      badgeClass: "bg-amber-500/15 text-amber-300 ring-amber-500/25",
    };
  }

  return {
    label: "Healthy",
    barClass: "bg-emerald-500",
    badgeClass: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
  };
}

function BudgetCard({ category }: { category: CategoryBudget }) {
  const utilization =
    category.budget > 0
      ? Math.min((category.spent / category.budget) * 100, 100)
      : 0;
  const health = getBudgetHealth(category.spent, category.budget);

  return (
    <article className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">
            {category.categoryName}
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            {Math.round(utilization)}% utilized
          </p>
        </div>
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ring-1",
            health.badgeClass,
          )}
        >
          {health.label}
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={cn("h-full rounded-full transition-all", health.barClass)}
          style={{ width: `${utilization}%` }}
        />
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-xs text-zinc-500">Budget</dt>
          <dd className="mt-1 font-medium text-white">
            {formatCurrency(category.budget)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-500">Spent</dt>
          <dd className="mt-1 font-medium text-white">
            {formatCurrency(category.spent)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-500">Remaining</dt>
          <dd className="mt-1 font-medium text-emerald-300">
            {formatCurrency(category.remaining)}
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function BudgetSection({ budgetSummary }: BudgetSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Budget Overview</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Track utilization and remaining balance by category.
        </p>
      </div>

      {budgetSummary.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="No budgets created yet"
          description="Create your first budget to start tracking spending across categories."
          actionLabel="Create Budget"
        />
      ) : (
        <div className="space-y-4">
          {budgetSummary.map((category) => (
            <BudgetCard
              key={category.categoryId}
              category={category}
            />
          ))}
        </div>
      )}
    </section>
  );
}