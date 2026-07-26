import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Pencil, PiggyBank, Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/table/useDataTable";
import { budgetStore } from "@/store/budget.store";
import type { Category } from "@/types/categoryTypes/Category";
import {
  getBudgetCategoryName,
  getBudgetCategoryId,
  getBudgetDocumentId,
  type Budget,
} from "@/types/budgetTypes/Budget";
import type { FieldConfig } from "@/components/forms/DynamicForm";
import type { SelectOption } from "@/components/forms/DynamicForm/DynamicForm.types";
import type { BudgetFormValues } from "@/schemas/budget/budget.schema";
import { useLookupData } from "@/utils/Common/useLookUpData";

export type BudgetPanelMode = "closed" | "create" | "update";

export function buildBudgetColumns({
  onEdit,
  onDelete,
  isLoading,
  categoryLookup,
  monthLookup,
}: {
  onEdit: (row: Budget) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  categoryLookup: Record<string, Category>;
  monthLookup: Record<number, string>;
}): ColumnDef<Budget, unknown>[] {
  return [
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ getValue }) =>
        createElement(
          "span",
          { className: "font-medium text-white" },
          `$${Number(getValue()).toFixed(2)}`,
        ),
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      cell: ({ getValue }) => {
        const categoryName = getBudgetCategoryName(
          getValue() as Budget["categoryId"],
          categoryLookup,
        );

        return createElement(
          "span",
          { className: "text-zinc-300" },
          categoryName,
        );
      },
    },
    {
      accessorKey: "month",
      header: "Month",
      cell: ({ getValue }) => {
        const month = getValue() as number;
        return createElement(
          "span",
          { className: "text-zinc-300" },
          monthLookup[month] ?? "—",
        );
      },
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ getValue }) =>
        createElement(
          "span",
          { className: "text-zinc-300" },
          getValue() as number,
        ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      size: 80,
      cell: ({ row }) =>
        createElement(
          "div",
          { className: "flex items-center justify-end gap-0.5" },
          createElement(
            "button",
            {
              type: "button",
              "aria-label": "Edit budget",
              disabled: isLoading,
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onEdit(row.original);
              },
              className:
                "flex size-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-orange-400 disabled:pointer-events-none disabled:opacity-40",
            },
            createElement(Pencil, {
              className: "size-3.5",
              "aria-hidden": true,
            }),
          ),
          createElement(
            "button",
            {
              type: "button",
              "aria-label": "Delete budget",
              disabled: isLoading,
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onDelete(getBudgetDocumentId(row.original));
              },
              className:
                "flex size-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400 disabled:pointer-events-none disabled:opacity-40",
            },
            createElement(Trash2, {
              className: "size-3.5",
              "aria-hidden": true,
            }),
          ),
        ),
    },
  ];
}

export function useBudget() {
  const {
    budgetList,
    isLoading,
    insertBudget,
    fetchBudgetList,
    updateBudget,
    deleteBudget,
  } = budgetStore();

  const { categoryOptions, categoryMap, monthOptions, monthMap } =
    useLookupData();

  const [panelMode, setPanelMode] = useState<BudgetPanelMode>("closed");
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    void fetchBudgetList().finally(() => setHasFetched(true));
  }, [fetchBudgetList]);

  const BUDGET_FIELDS: FieldConfig<BudgetFormValues>[] = useMemo(() => {
    const monthSelectOptions: SelectOption[] = monthOptions.map((option) => ({
      label: option.label,
      value: String(option.value),
    }));

    return [
      {
        name: "amount",
        type: "number",
        label: "Amount",
        placeholder: "0.00",
        required: true,
        min: 0,
        step: 0.01,
      },
      {
        name: "categoryId",
        type: "select",
        label: "Category",
        placeholder: "Select category",
        required: true,
        options: categoryOptions,
      },
      {
        name: "month",
        type: "select",
        label: "Month",
        placeholder: "Select month",
        required: true,
        options: monthSelectOptions,
      },
      {
        name: "year",
        type: "number",
        label: "Year",
        placeholder: "2025",
        required: true,
        min: 1900,
        max: 2100,
      },
    ];
  }, [categoryOptions, monthOptions]);

  const formDefaultValues = useMemo<Partial<BudgetFormValues>>(() => {
    if (panelMode === "update" && selectedBudget) {
      return {
        amount: selectedBudget.amount,
        categoryId: getBudgetCategoryId(selectedBudget.categoryId),
        month: selectedBudget.month,
        year: selectedBudget.year,
      };
    }

    return {
      amount: undefined,
      categoryId: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
  }, [panelMode, selectedBudget]);

  const openCreate = useCallback(() => {
    setSelectedBudget(null);
    setPanelMode("create");
  }, []);

  const openUpdate = useCallback((budget: Budget) => {
    setSelectedBudget(budget);
    setPanelMode("update");
  }, []);

  const closePanel = useCallback(() => {
    setPanelMode("closed");
    setSelectedBudget(null);
  }, []);

  const handleSubmit = useCallback(
    async (values: BudgetFormValues) => {
      if (panelMode === "create") {
        await insertBudget({
          amount: values.amount,
          categoryId: values.categoryId,
          month: values.month,
          year: values.year,
        });
      } else if (panelMode === "update" && selectedBudget) {
        await updateBudget(getBudgetDocumentId(selectedBudget), {
          amount: values.amount,
          categoryId: values.categoryId,
          month: values.month,
          year: values.year,
        });
      }
      closePanel();
    },
    [closePanel, insertBudget, panelMode, selectedBudget, updateBudget],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const isSelected =
        getBudgetDocumentId(selectedBudget ?? ({} as Budget)) === id;

      await deleteBudget(id);

      if (isSelected) {
        closePanel();
      }
    },
    [closePanel, deleteBudget, selectedBudget],
  );

  const columns = useMemo(
    () =>
      buildBudgetColumns({
        onEdit: openUpdate,
        onDelete: (id) => void handleDelete(id),
        isLoading,
        categoryLookup: categoryMap,
        monthLookup: monthMap,
      }),
    [categoryMap, handleDelete, isLoading, monthMap, openUpdate],
  );

  const globalFilterFn = useCallback(
    (row: Budget, query: string) => {
      const categoryName = getBudgetCategoryName(row.categoryId, categoryMap);
      const monthName = monthMap[row.month] ?? "";

      return [
        categoryName,
        monthName,
        row.year.toString(),
        row.amount.toString(),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    },
    [categoryMap, monthMap],
  );

  const tableInstance = useDataTable<Budget>({
    data: budgetList,
    columns,
    getRowId: (row) => getBudgetDocumentId(row),
    globalFilterFn,
  });

  return {
    isLoading,
    hasFetched,
    panelMode,
    selectedBudget,
    formDefaultValues,
    tableInstance,
    openCreate,
    openUpdate,
    closePanel,
    handleSubmit,
    handleDelete,
    emptyStateIcon: PiggyBank,
    budgetFields: BUDGET_FIELDS,
  };
}
