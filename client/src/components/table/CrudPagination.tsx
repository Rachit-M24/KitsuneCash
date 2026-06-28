import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface CrudPaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  className?: string;
}

export function CrudPagination<TData>({
  table,
  pageSizeOptions = [10, 20, 50],
  className,
}: CrudPaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;

  if (totalRows === 0) {
    return null;
  }

  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-t border-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-xs text-zinc-500">
        Showing{" "}
        <span className="font-medium text-zinc-300">
          {from}–{to}
        </span>{" "}
        of <span className="font-medium text-zinc-300">{totalRows}</span>
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-xs text-zinc-500">
            Rows
          </label>
          <Select
            id="page-size"
            value={String(pageSize)}
            onChange={(event) => table.setPageSize(Number(event.target.value))}
            className="h-8 w-[70px] border-white/10 bg-white/[0.03] text-xs text-white"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size} className="bg-zinc-900">
                {size}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="border-white/10 bg-white/[0.02] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            aria-label="First page"
          >
            <ChevronsLeft className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-white/10 bg-white/[0.02] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-3.5" />
          </Button>

          <span className="min-w-[80px] px-2 text-center text-xs text-zinc-400">
            {pageIndex + 1} / {Math.max(pageCount, 1)}
          </span>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-white/10 bg-white/[0.02] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            aria-label="Next page"
          >
            <ChevronRight className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            className="border-white/10 bg-white/[0.02] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            aria-label="Last page"
          >
            <ChevronsRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
