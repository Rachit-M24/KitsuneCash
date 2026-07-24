import { Receipt, Trash2, X } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/components/DashboardLayout";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { AppDataTable } from "@/components/table/AppDataTable";
import { Button } from "@/components/ui/button";
import { expenseSchema } from "@/schemas/expense/expense.schema";
import type { ExpenseFormValues } from "@/schemas/expense/expense.schema";

import { useExpense } from "./useExpense";

export default function ExpensePage() {
  const {
    isLoading,
    panelMode,
    selectedExpense,
    formDefaultValues,
    tableInstance,
    openCreate,
    closePanel,
    handleSubmit,
    handleDelete,
    emptyStateIcon,
    expenseFields,
  } = useExpense();

  const isPanelOpen = panelMode !== "closed";

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Expenses
        </h1>
        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Track your spending with a simple expense management workflow.
        </p>
      </div>

      <div
        className={`flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6`}
      >
        <div className={isPanelOpen ? "min-w-0 flex-1" : "w-full"}>
          <AppDataTable
            table={tableInstance.table}
            loading={isLoading}
            searchValue={tableInstance.globalFilter}
            onSearchChange={tableInstance.setGlobalFilter}
            searchPlaceholder="Search expenses…"
            toolbar={{
              title: "All Expenses",
              description: `${tableInstance.totalCount} ${
                tableInstance.totalCount === 1 ? "expense" : "expenses"
              } total`,
              createLabel: "New Expense",
              onCreate: openCreate,
            }}
            emptyState={{
              icon: emptyStateIcon,
              title: "No expenses yet",
              description:
                "Create your first expense to start tracking spending.",
              actionLabel: "New Expense",
              onAction: openCreate,
            }}
            showPagination={false}
          />
        </div>

        {isPanelOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/40 ring-1 ring-white/5">
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-orange-500/15 ring-1 ring-orange-500/30">
                    <Receipt className="size-4 text-orange-400" aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      {panelMode === "create" ? "New Expense" : "Edit Expense"}
                    </h2>
                    {panelMode === "update" && selectedExpense ? (
                      <p className="text-xs text-zinc-500">
                        {selectedExpense.description || "Update expense"}
                      </p>
                    ) : null}
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Close panel"
                  onClick={closePanel}
                  className="flex size-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              <div className="px-5 py-5">
                <DynamicForm<ExpenseFormValues>
                  key={`${panelMode}-${selectedExpense?.id ?? "new"}`}
                  fields={expenseFields}
                  schema={expenseSchema}
                  defaultValues={formDefaultValues}
                  onSubmit={handleSubmit}
                  onCancel={closePanel}
                  mode={panelMode === "update" ? "update" : "create"}
                  loading={isLoading}
                />
              </div>

              {panelMode === "update" && selectedExpense ? (
                <div className="border-t border-white/5 px-5 py-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isLoading}
                    onClick={() => void handleDelete(selectedExpense.id)}
                    className="w-full justify-start gap-2 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                  >
                    <Trash2 className="size-4" aria-hidden />
                    Delete expense
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
}
