import { PiggyBank, Target, TrendingDown, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DashboardSummary } from "@/types/dashboardTypes/dashboardSummary.types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../utils/formatCurrency";

interface KpiCardsProps {
  dashboardSummary: DashboardSummary;
}

type KpiKey = "totalBudget" | "totalSpent" | "totalRemaining" | "activeGoals";

interface KpiItem {
  key: KpiKey;
  label: string;
  icon: LucideIcon;
  accent: string;
}

const kpiConfig: KpiItem[] = [
  {
    key: "totalBudget",
    label: "Total Budget",
    icon: Wallet,
    accent: "from-blue-500/20 to-blue-500/5 text-blue-300 ring-blue-500/20",
  },
  {
    key: "totalSpent",
    label: "Total Spent",
    icon: TrendingDown,
    accent: "from-rose-500/20 to-rose-500/5 text-rose-300 ring-rose-500/20",
  },
  {
    key: "totalRemaining",
    label: "Remaining Budget",
    icon: PiggyBank,
    accent:
      "from-emerald-500/20 to-emerald-500/5 text-emerald-300 ring-emerald-500/20",
  },
  {
    key: "activeGoals",
    label: "Active Goals",
    icon: Target,
    accent:
      "from-orange-500/20 to-orange-500/5 text-orange-300 ring-orange-500/20",
  },
];

function getKpiValue(dashboardSummary: DashboardSummary, key: KpiKey): string | number {
  if (key === "activeGoals") {
    const value = dashboardSummary.activeGoals;
    return typeof value === "number" ? value : value.length;
  }

  return formatCurrency(dashboardSummary[key]);
}

export function KpiCards({ dashboardSummary }: KpiCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpiConfig.map(({ key, label, icon: Icon, accent }) => (
        <article
          key={key}
          className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-white/15 hover:bg-white/[0.05]"
        >
          <div
            className={cn(
              "mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ring-1",
              accent,
            )}
          >
            <Icon className="size-5" aria-hidden />
          </div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {getKpiValue(dashboardSummary, key)}
          </p>
        </article>
      ))}
    </section>
  );
}
