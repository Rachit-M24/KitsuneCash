import { Target } from "lucide-react";
import type { GoalProgress } from "@/types/dashboardTypes/goalProgress.types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../utils/formatCurrency";
import { EmptyState } from "./EmptyState";

interface GoalsSectionProps {
  goalSummary: GoalProgress[];
}

function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex size-20 shrink-0 items-center justify-center">
      <svg className="-rotate-90 size-20" viewBox="0 0 88 88" aria-hidden>
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-white/10"
        />
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-orange-400 transition-all duration-500"
        />
      </svg>
      <span className="absolute text-sm font-semibold text-white">
        {Math.round(percentage)}%
      </span>
    </div>
  );
}

function GoalCard({ goal }: { goal: GoalProgress }) {
  return (
    <article className="flex items-center gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.05]">
      <ProgressRing percentage={goal.progressPercentage} />

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold text-white">
          {goal.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          <span className="font-medium text-white">
            {formatCurrency(goal.currentAmount)}
          </span>
          {" / "}
          <span>{formatCurrency(goal.targetAmount)}</span>
        </p>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className={cn("h-full rounded-full bg-orange-500 transition-all")}
            style={{ width: `${Math.min(goal.progressPercentage, 100)}%` }}
          />
        </div>
      </div>
    </article>
  );
}

export function GoalsSection({ goalSummary }: GoalsSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Savings Goals</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Monitor progress toward your financial milestones.
        </p>
      </div>

      {goalSummary.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No active goals yet"
          description="Set a savings goal to stay motivated and track your progress over time."
          actionLabel="Create Goal"
        />
      ) : (
        <div className="space-y-4">
          {goalSummary.map((goal) => (
            <GoalCard key={goal.title} goal={goal} />
          ))}
        </div>
      )}
    </section>
  );
}
