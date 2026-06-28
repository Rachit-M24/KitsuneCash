import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type {
  CrudEmptyStateConfig,
  CrudFilterConfig,
  CrudToolbarConfig,
} from "@/hooks/table/useDataTable";

import { CrudEmptyState } from "./CrudEmptyState";
import { CrudFilters } from "./CrudFilters";
import { CrudPagination } from "./CrudPagination";
import { CrudToolbar } from "./CrudToolbar";

export interface AppDataTableProps<TData> {
  table: TanstackTable<TData>;
  loading?: boolean;
  toolbar?: CrudToolbarConfig;
  filters?: CrudFilterConfig[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  emptyState?: CrudEmptyStateConfig;
  onRowClick?: (row: TData) => void;
  className?: string;
  tableClassName?: string;
  showPagination?: boolean;
}

function SortIndicator({ direction }: { direction: false | "asc" | "desc" }) {
  if (direction === "asc") {
    return <ArrowUp className="size-3.5 text-orange-400" aria-hidden />;
  }

  if (direction === "desc") {
    return <ArrowDown className="size-3.5 text-orange-400" aria-hidden />;
  }

  return <ArrowUpDown className="size-3.5 text-zinc-600" aria-hidden />;
}

export function AppDataTable<TData>({
  table,
  loading = false,
  toolbar,
  filters = [],
  searchValue,
  onSearchChange,
  searchPlaceholder,
  emptyState,
  onRowClick,
  className,
  tableClassName,
  showPagination = true,
}: AppDataTableProps<TData>) {
  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;
  const showToolbar =
    toolbar ||
    onSearchChange ||
    filters.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] ring-1 ring-white/5",
        className,
      )}
    >
      {showToolbar ? (
        <div className="border-b border-white/5 p-4">
          <CrudToolbar
            title={toolbar?.title}
            description={toolbar?.description}
            createLabel={toolbar?.createLabel}
            onCreate={toolbar?.onCreate}
            actions={toolbar?.actions}
          >
            <CrudFilters
              searchValue={searchValue}
              onSearchChange={onSearchChange}
              searchPlaceholder={
                searchPlaceholder ?? toolbar?.searchPlaceholder ?? "Search..."
              }
              filters={filters}
            />
          </CrudToolbar>
        </div>
      ) : null}

      <div className={cn("relative", tableClassName)}>
        {loading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/60 backdrop-blur-[1px]">
            <Loader2
              className="size-6 animate-spin text-orange-400"
              aria-label="Loading data"
            />
          </div>
        ) : null}

        {!loading && !hasRows && emptyState ? (
          <CrudEmptyState
            icon={emptyState.icon}
            title={emptyState.title}
            description={emptyState.description}
            actionLabel={emptyState.actionLabel}
            onAction={emptyState.onAction}
            className="border-0 bg-transparent"
          />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-white/5 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sortDirection = header.column.getIsSorted();

                    return (
                      <TableHead
                        key={header.id}
                        className="h-10 border-white/5 text-xs font-medium tracking-wide text-zinc-500 uppercase"
                      >
                        {header.isPlaceholder ? null : canSort ? (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-300"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            <SortIndicator direction={sortDirection} />
                          </button>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {hasRows ? (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    onClick={
                      onRowClick ? () => onRowClick(row.original) : undefined
                    }
                    className={cn(
                      "border-white/5 transition-colors hover:bg-white/[0.03]",
                      onRowClick && "cursor-pointer",
                      row.getIsSelected() && "bg-orange-500/5",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-sm text-zinc-300"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center text-sm text-zinc-500"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {showPagination && hasRows ? <CrudPagination table={table} /> : null}
    </div>
  );
}
