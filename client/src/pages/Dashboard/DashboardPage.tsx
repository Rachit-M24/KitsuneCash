import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "./useDashboard";
import { DashboardLayout } from "@/components/dashboard/components/DashboardLayout";
import { DashboardSkeleton } from "@/components/dashboard/components/DashboardSkeleton";
import { AiInsightCard } from "@/components/dashboard/components/AiInsightCard";
import { KpiCards } from "@/components/dashboard/components/KpiCards";
import { GoalsSection } from "@/components/dashboard/components/GoalsSection";
import { BudgetSection } from "@/components/dashboard/components/BudgetSection";
import { TrendSection } from "@/components/dashboard/components/TrendSection";

export function DashboardPage() {
  const { dashboardResponse, isLoading, error, refetch } = useDashboard();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Your complete financial overview at a glance.
        </p>
      </div>

      {isLoading ? (
        <DashboardSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 px-6 py-16 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-rose-500/15 ring-1 ring-rose-500/25">
            <AlertCircle className="size-6 text-rose-300" aria-hidden />
          </div>
          <h2 className="text-lg font-semibold text-white">
            Unable to load dashboard
          </h2>
          <p className="mt-2 max-w-md text-sm text-zinc-400">{error}</p>
          <Button
            type="button"
            size="sm"
            className="mt-6 bg-orange-500 text-white hover:bg-orange-400"
            onClick={() => {
              void refetch();
            }}
          >
            Try again
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          <AiInsightCard budgetSummary={dashboardResponse.budgetSummary} />

          <KpiCards dashboardSummary={dashboardResponse.dashboardSummary} />

          <div className="grid gap-8 lg:grid-cols-2">
            <BudgetSection budgetSummary={dashboardResponse.budgetSummary} />
            <GoalsSection goalSummary={dashboardResponse.goalSummary} />
          </div>

          <TrendSection trendSummary={dashboardResponse.trendSummary} />
        </div>
      )}
    </DashboardLayout>
  );
}
