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
import { expenseStore } from "@/store/expense.store";
import type { Expense } from "@/types/expenseTypes/Expense";
import type { FieldConfig } from "@/components/forms/DynamicForm";
import type { ExpenseFormValues } from "@/schemas/expense/expense.schema";

export type ExpensePanelMode = "closed" | "create" | "update";

export function buildExpenseColumns({
  onEdit,
  onDelete,
  isLoading,
}: {
  onEdit: (row: Expense) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}): ColumnDef<Expense, unknown>[] {
  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ getValue }) =>
        createElement(
          "span",
          { className: "font-medium text-white" },
          getValue() as string,
        ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) =>
        createElement(
          "span",
          { className: "text-zinc-300" },
          getValue() as string,
        ),
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
              "aria-label": `Edit ${row.original.title}`,
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
              "aria-label": `Delete ${row.original.title}`,
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

export const EXPENSE_FIELDS: FieldConfig<ExpenseFormValues>[] = [
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "e.g. Grocery run",
    required: true,
  },
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
    name: "category",
    type: "select",
    label: "Category",
    placeholder: "Select category",
    required: true,
    options: [
      { label: "Food", value: "Food" },
      { label: "Travel", value: "Travel" },
      { label: "Utilities", value: "Utilities" },
      { label: "Entertainment", value: "Entertainment" },
      { label: "Health", value: "Health" },
    ],
  },
  {
    name: "date",
    type: "date",
    label: "Date",
    required: true,
  },
];

export function useExpense() {
  const {
    expenseList,
    isLoading,
    insertExpense,
    fetchExpenseList,
    updateExpense,
    deleteExpense,
  } = expenseStore();

  const [panelMode, setPanelMode] = useState<ExpensePanelMode>("closed");
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    void fetchExpenseList().finally(() => setHasFetched(true));
  }, [fetchExpenseList]);

  const formDefaultValues = useMemo<Partial<ExpenseFormValues>>(() => {
    if (panelMode === "update" && selectedExpense) {
      return {
        title: selectedExpense.title,
        description: selectedExpense.description ?? "",
        amount: selectedExpense.amount,
        category: selectedExpense.category,
        date: selectedExpense.date.slice(0, 10),
      };
    }

    return {
      title: "",
      description: "",
      amount: undefined,
      category: "",
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
          title: values.title,
          description: values.description ?? "",
          amount: values.amount,
          category: values.category,
          date: values.date,
        });
      } else if (panelMode === "update" && selectedExpense) {
        await updateExpense(selectedExpense.id, {
          title: values.title,
          description: values.description ?? "",
          amount: values.amount,
          category: values.category,
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
      }),
    [handleDelete, isLoading, openUpdate],
  );

  const tableInstance = useDataTable<Expense>({
    data: expenseList,
    columns,
    getRowId: (row) => row.id,
    globalFilterFn: (row, query) =>
      [row.title, row.category, row.description]
        .join(" ")
        .toLowerCase()
        .includes(query),
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
  };
}
