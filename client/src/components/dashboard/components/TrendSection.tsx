import {
  ArrowDownLeft,
  ArrowUpRight,
  Layers,
  Scale,
} from "lucide-react";
import type { TrendsSummary } from "@/types/dashboardTypes/trendsSummary.types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../utils/formatCurrency";

interface TrendSectionProps {
  trendSummary: TrendsSummary;
}

const trendConfig = [
  {
    key: "totalExpense" as const,
    label: "Total Expense",
    icon: ArrowUpRight,
    accent: "text-rose-300 bg-rose-500/15 ring-rose-500/20",
    format: "currency" as const,
  },
  {
    key: "totalIncome" as const,
    label: "Total Income",
    icon: ArrowDownLeft,
    accent: "text-emerald-300 bg-emerald-500/15 ring-emerald-500/20",
    format: "currency" as const,
  },
  {
    key: "totalBalance" as const,
    label: "Net Balance",
    icon: Scale,
    accent: "text-orange-300 bg-orange-500/15 ring-orange-500/20",
    format: "currency" as const,
  },
  {
    key: "totalCategories" as const,
    label: "Categories Tracked",
    icon: Layers,
    accent: "text-blue-300 bg-blue-500/15 ring-blue-500/20",
    format: "count" as const,
  },
] as const;

function formatTrendValue(
  trendSummary: TrendsSummary,
  key: (typeof trendConfig)[number]["key"],
  format: (typeof trendConfig)[number]["format"],
) {
  const value = trendSummary[key];

  if (format === "count") {
    return value;
  }

  return formatCurrency(value);
}

export function TrendSection({ trendSummary }: TrendSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Financial Trends</h2>
        <p className="mt-1 text-sm text-zinc-400">
          A snapshot of your income, expenses, and category coverage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {trendConfig.map(({ key, label, icon: Icon, accent, format }) => {
          const isNegativeBalance =
            key === "totalBalance" && trendSummary.totalBalance < 0;

          return (
            <article
              key={key}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div
                className={cn(
                  "mb-4 inline-flex size-10 items-center justify-center rounded-xl ring-1",
                  accent,
                )}
              >
                <Icon className="size-4.5" aria-hidden />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {label}
              </p>
              <p
                className={cn(
                  "mt-2 text-xl font-semibold tracking-tight",
                  isNegativeBalance ? "text-rose-300" : "text-white",
                )}
              >
                {formatTrendValue(trendSummary, key, format)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
