import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Tag, Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { categoryStore } from "@/store/category.store";
import { useDataTable } from "@/hooks/table/useDataTable";
import type { Category } from "@/types/categoryTypes/Category";
import type { FieldConfig } from "@/components/forms/DynamicForm";
import type { CategoryFormValues } from "@/schemas/category/category.schema";

/** Drives which panel is visible */
export type FormPanelMode = "closed" | "create" | "update";


export function buildCategoryColumns({
  onEdit,
  onDelete,
  isLoading,
}: {
  onEdit: (row: Category) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}): ColumnDef<Category, unknown>[] {
  return [
    {
      accessorKey: "icon",
      header: "Icon",
      enableSorting: false,
      size: 56,
      cell: ({ getValue }) => (
        <span className="select-none text-xl leading-none" aria-hidden>
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => (
        <span className="font-medium text-white">{getValue() as string}</span>
      ),
    },
    {
      id: "actions",
      header: "",           // no header label — icon buttons speak for themselves
      enableSorting: false,
      size: 80,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-0.5">
          <button
            type="button"
            aria-label={`Edit ${row.original.name}`}
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(row.original);
            }}
            className="flex size-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-orange-400 disabled:pointer-events-none disabled:opacity-40"
          >
            <Pencil className="size-3.5" aria-hidden />
          </button>

          <button
            type="button"
            aria-label={`Delete ${row.original.name}`}
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(row.original.id);
            }}
            className="flex size-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400 disabled:pointer-events-none disabled:opacity-40"
          >
            <Trash2 className="size-3.5" aria-hidden />
          </button>
        </div>
      ),
    },
  ];
}

// ─── DynamicForm field config ────────────────────────────────────────────────
// Defined once here; consumed by CategoryPage for both create & update modes.

export const CATEGORY_FIELDS: FieldConfig<CategoryFormValues>[] = [
  {
    name: "name",
    type: "text",
    label: "Category name",
    placeholder: "e.g. Groceries",
    required: true,
  },
  {
    name: "icon",
    type: "emoji",
    label: "Icon",
    required: true,
  },
];

// ─── Page hook ───────────────────────────────────────────────────────────────

export function useCategoryPage() {
  const { categoryList, isLoading, actions } = categoryStore();

  const [panelMode, setPanelMode] = useState<FormPanelMode>("closed");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // Track whether the initial fetch has been attempted so the page can show
  // a proper skeleton instead of the empty-state on first load.
  const [hasFetched, setHasFetched] = useState(false);

  /* ── fetch on mount ───────────────────────────────────────────────── */
  useEffect(() => {
    void actions.fetchCategoryList().finally(() => setHasFetched(true));
  }, []);

  /* ── form default values ─────────────────────────────────────────── */
  const formDefaultValues = useMemo<Partial<CategoryFormValues>>(() => {
    if (panelMode === "update" && selectedCategory) {
      return { name: selectedCategory.name, icon: selectedCategory.icon };
    }
    return { name: "", icon: "" };
  }, [panelMode, selectedCategory]);

  /* ── panel helpers ───────────────────────────────────────────────── */
  const openCreate = useCallback(() => {
    setSelectedCategory(null);
    setPanelMode("create");
  }, []);

  const openUpdate = useCallback((category: Category) => {
    setSelectedCategory(category);
    setPanelMode("update");
  }, []);

  const closePanel = useCallback(() => {
    setPanelMode("closed");
    setSelectedCategory(null);
  }, []);

  /* ── create / update ─────────────────────────────────────────────── */
  const handleSubmit = useCallback(
    async (values: CategoryFormValues) => {
      if (panelMode === "create") {
        await actions.insertCategory(values);
      } else if (panelMode === "update" && selectedCategory) {
        await actions.updateCategory(selectedCategory.id, values);
      }
      // Store already refreshes categoryList; just close the panel.
      closePanel();
    },
    [panelMode, selectedCategory, actions, closePanel],
  );

  /* ── delete ──────────────────────────────────────────────────────── */
  const handleDelete = useCallback(
    async (id: string) => {
      await actions.deleteCategory(id);
      // If the panel was showing the deleted category, close it.
      if (selectedCategory?.id === id) {
        closePanel();
      }
    },
    [actions, selectedCategory, closePanel],
  );

  /* ── columns (after callbacks so the closures are stable) ────────── */
  const columns = useMemo(
    () =>
      buildCategoryColumns({
        onEdit: openUpdate,
        onDelete: (id) => void handleDelete(id),
        isLoading,
      }),
    [openUpdate, handleDelete, isLoading],
  );

  /* ── table instance ──────────────────────────────────────────────── */
  const tableInstance = useDataTable<Category>({
    data: categoryList,
    columns,
    getRowId: (row) => row.id,
    globalFilterFn: (row, query) =>
      row.name.toLowerCase().includes(query),
  });

  return {
    /* state */
    isLoading,
    hasFetched,
    panelMode,
    selectedCategory,
    formDefaultValues,
    /* table */
    tableInstance,
    /* actions */
    openCreate,
    openUpdate,
    closePanel,
    handleSubmit,
    handleDelete,
    /* metadata */
    emptyStateIcon: Tag,
  };
}
