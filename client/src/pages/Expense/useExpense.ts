import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Pencil, Receipt, Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/table/useDataTable";
import { categoryStore } from "@/store/category.store";
import { expenseStore } from "@/store/expense.store";
import type { Category } from "@/types/categoryTypes/Category";
import type { Expense } from "@/types/expenseTypes/Expense";
import type { FieldConfig } from "@/components/forms/DynamicForm";
import type { ExpenseFormValues } from "@/schemas/expense/expense.schema";

export type ExpensePanelMode = "closed" | "create" | "update";

export function buildExpenseColumns({
  onEdit,
  onDelete,
  isLoading,
  categoryLookup,
}: {
  onEdit: (row: Expense) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  categoryLookup: Record<string, Category>;
}): ColumnDef<Expense, unknown>[] {
  return [
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) =>
        createElement(
          "span",
          { className: "font-medium text-white" },
          (getValue() as string) || "—",
        ),
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      cell: ({ getValue }) => {
        const categoryId = getValue() as string;
        const categoryName = categoryLookup[categoryId]?.name ?? "Unassigned";

        return createElement(
          "span",
          { className: "text-zinc-300" },
          categoryName,
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ getValue }) =>
        createElement(
          "span",
          { className: "text-zinc-300" },
          `$${Number(getValue()).toFixed(2)}`,
        ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ getValue }) =>
        createElement(
          "span",
          { className: "text-zinc-300" },
          new Date(getValue() as string).toLocaleDateString(),
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
              "aria-label": `Edit expense`,
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
              "aria-label": `Delete expense`,
              disabled: isLoading,
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onDelete(row.original.id);
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

export function useExpense() {
  const {
    expenseList,
    isLoading,
    insertExpense,
    fetchExpenseList,
    updateExpense,
    deleteExpense,
  } = expenseStore();

  const { categoryList, actions: categoryActions } = categoryStore();

  const [panelMode, setPanelMode] = useState<ExpensePanelMode>("closed");
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    void fetchExpenseList().finally(() => setHasFetched(true));
  }, [fetchExpenseList]);

  useEffect(() => {
    if (categoryList.length === 0) {
      void categoryActions.fetchCategoryList();
    }
  }, [categoryActions, categoryList.length]);

  const categoryOptions = useMemo(
    () =>
      categoryList.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categoryList],
  );

  const categoryLookup = useMemo(
    () =>
      Object.fromEntries(
        categoryList.map((category) => [category.id, category]),
      ) as Record<string, Category>,
    [categoryList],
  );

  const EXPENSE_FIELDS: FieldConfig<ExpenseFormValues>[] = useMemo(
    () => [
      {
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder: "Add notes about this expense",
        required: false,
      },
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
        name: "date",
        type: "date",
        label: "Date",
        required: true,
      },
    ],
    [categoryOptions],
  );

  const formDefaultValues = useMemo<Partial<ExpenseFormValues>>(() => {
    if (panelMode === "update" && selectedExpense) {
      const selectedCategoryId = selectedExpense.categoryId ?? "";
      return {
        description: selectedExpense.description ?? "",
        amount: selectedExpense.amount,
        categoryId: selectedCategoryId,
        date: selectedExpense.date.slice(0, 10),
      };
    }

    return {
      description: "",
      amount: undefined,
      categoryId: "",
      date: "",
    };
  }, [panelMode, selectedExpense]);

  const openCreate = useCallback(() => {
    setSelectedExpense(null);
    setPanelMode("create");
  }, []);

  const openUpdate = useCallback((expense: Expense) => {
    setSelectedExpense(expense);
    setPanelMode("update");
  }, []);

  const closePanel = useCallback(() => {
    setPanelMode("closed");
    setSelectedExpense(null);
  }, []);

  const handleSubmit = useCallback(
    async (values: ExpenseFormValues) => {
      if (panelMode === "create") {
        await insertExpense({
          description: values.description ?? "",
          amount: values.amount,
          categoryId: values.categoryId,
          date: values.date,
        });
      } else if (panelMode === "update" && selectedExpense) {
        await updateExpense(selectedExpense.id, {
          description: values.description ?? "",
          amount: values.amount,
          categoryId: values.categoryId,
          date: values.date,
        });
      }
      closePanel();
    },
    [panelMode, selectedExpense, insertExpense, updateExpense, closePanel],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteExpense(id);
      if (selectedExpense?.id === id) {
        closePanel();
      }
    },
    [deleteExpense, closePanel, selectedExpense?.id],
  );

  const columns = useMemo(
    () =>
      buildExpenseColumns({
        onEdit: openUpdate,
        onDelete: (id) => void handleDelete(id),
        isLoading,
        categoryLookup,
      }),
    [categoryLookup, handleDelete, isLoading, openUpdate],
  );

  const tableInstance = useDataTable<Expense>({
    data: expenseList,
    columns,
    getRowId: (row) => row.id,
    globalFilterFn: (row, query) => {
      const categoryName = categoryLookup[row.categoryId]?.name ?? "";
      return [row.description, categoryName, row.amount.toString()]
        .join(" ")
        .toLowerCase()
        .includes(query);
    },
  });

  return {
    isLoading,
    hasFetched,
    panelMode,
    selectedExpense,
    formDefaultValues,
    tableInstance,
    openCreate,
    openUpdate,
    closePanel,
    handleSubmit,
    handleDelete,
    emptyStateIcon: Receipt,
    expenseFields: EXPENSE_FIELDS,
  };
}
