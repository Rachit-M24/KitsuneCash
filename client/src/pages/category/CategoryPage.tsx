import { Tag, Trash2, X } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard/components/DashboardLayout";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { AppDataTable } from "@/components/table/AppDataTable";
import { Button } from "@/components/ui/button";
import { categorySchema } from "@/schemas/category/category.schema";
import type { CategoryFormValues } from "@/schemas/category/category.schema";

import { CATEGORY_FIELDS, useCategoryPage } from "./useCategoryPage.tsx";

export default function CategoryPage() {
  const {
    isLoading,
    panelMode,
    selectedCategory,
    formDefaultValues,
    tableInstance,
    openCreate,
    openUpdate,
    closePanel,
    handleSubmit,
    handleDelete,
    emptyStateIcon,
  } = useCategoryPage();

  const isPanelOpen = panelMode !== "closed";

  return (
    <DashboardLayout>
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Categories
        </h1>
        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Organise your expenses with custom categories and icons.
        </p>
      </div>

      {/* ── Responsive split layout ──────────────────────────────────── */}
      <div
        className={`flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6`}
      >
        {/* ── Table card ───────────────────────────────────────────── */}
        <div className={isPanelOpen ? "min-w-0 flex-1" : "w-full"}>
          <AppDataTable
            table={tableInstance.table}
            loading={isLoading}
            searchValue={tableInstance.globalFilter}
            onSearchChange={tableInstance.setGlobalFilter}
            searchPlaceholder="Search categories…"
            toolbar={{
              title: "All Categories",
              description: `${tableInstance.totalCount} ${
                tableInstance.totalCount === 1 ? "category" : "categories"
              } total`,
              createLabel: "New Category",
              onCreate: openCreate,
            }}
            emptyState={{
              icon: emptyStateIcon,
              title: "No categories yet",
              description:
                "Create your first category to start organising expenses.",
              actionLabel: "New Category",
              onAction: openCreate,
            }}
            showPagination={false}
          />
        </div>

        {/* ── Slide-in form panel ──────────────────────────────────── */}
        {isPanelOpen && (
          <div
            className="w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] ring-1 ring-white/5 lg:w-[380px]"
            style={{ animation: "slideInPanel 0.2s ease-out" }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-orange-500/15 ring-1 ring-orange-500/30">
                  <Tag className="size-4 text-orange-400" aria-hidden />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    {panelMode === "create" ? "New Category" : "Edit Category"}
                  </h2>
                  {panelMode === "update" && selectedCategory ? (
                    <p className="text-xs text-zinc-500">
                      {selectedCategory.icon} {selectedCategory.name}
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

            {/* DynamicForm — one instance, mode-switched via key */}
            <div className="px-5 py-5">
              <DynamicForm<CategoryFormValues>
                key={`${panelMode}-${selectedCategory?.id ?? "new"}`}
                fields={CATEGORY_FIELDS}
                schema={categorySchema}
                defaultValues={formDefaultValues}
                onSubmit={handleSubmit}
                onCancel={closePanel}
                mode={panelMode === "update" ? "update" : "create"}
                loading={isLoading}
              />
            </div>

            {/* Delete — update mode only */}
            {panelMode === "update" && selectedCategory ? (
              <div className="border-t border-white/5 px-5 py-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={isLoading}
                  onClick={() => void handleDelete(selectedCategory.id)}
                  className="w-full justify-start gap-2 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                >
                  <Trash2 className="size-4" aria-hidden />
                  Delete category
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>


      {/* Inline keyframe for panel slide-in */}
      <style>{`
        @keyframes slideInPanel {
          from { opacity: 0; transform: translateX(1rem); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </DashboardLayout>
  );
}
