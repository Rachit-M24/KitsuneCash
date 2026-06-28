import { useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

export interface CrudFilterOption {
  label: string;
  value: string;
}

export interface CrudFilterConfig {
  id: string;
  label: string;
  placeholder?: string;
  options: CrudFilterOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export interface CrudEmptyStateConfig {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface CrudToolbarConfig {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  createLabel?: string;
  onCreate?: () => void;
  actions?: ReactNode;
}

export interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  getRowId?: (row: TData) => string;
  initialPageSize?: number;
  enableRowSelection?: boolean;
  enableGlobalFilter?: boolean;
  globalFilterFn?: (row: TData, filterValue: string) => boolean;
  manualPagination?: boolean;
  pageCount?: number;
}

export function useDataTable<TData>({
  data,
  columns,
  getRowId,
  initialPageSize = 10,
  enableRowSelection = false,
  enableGlobalFilter = true,
  globalFilterFn,
  manualPagination = false,
  pageCount,
}: UseDataTableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const filteredData = useMemo(() => {
    if (!enableGlobalFilter || !globalFilter.trim() || !globalFilterFn) {
      return data;
    }

    const query = globalFilter.trim().toLowerCase();
    return data.filter((row) => globalFilterFn(row, query));
  }, [data, enableGlobalFilter, globalFilter, globalFilterFn]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      columnVisibility,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection,
    manualPagination,
    pageCount,
    getRowId: getRowId ?? undefined,
  });

  return {
    table,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
    rowSelection,
    setRowSelection,
    pagination,
    setPagination,
    filteredCount: filteredData.length,
    totalCount: data.length,
  };
}

export type { ColumnDef, SortingState, PaginationState, RowSelectionState };
