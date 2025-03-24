import { flexRender, type ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useDataTable } from "~/hooks/data-table";
import { cn } from "~/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import For from "../utils/for";
import LazySuspense from "../utils/lazy-suspense";

type DataTableProps<T> = {
  isDevtools?: boolean;
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
} & React.ComponentProps<"table">;
const DataTable = <T,>({
  data,
  columns,
  isDevtools,
  className,

  ...props
}: DataTableProps<T>) => {
  const table = useDataTable({
    data,
    columns,
  });

  const tableDevtoolsToJsx = React.useMemo(
    () =>
      isDevtools ? (
        <LazySuspense
          table={table}
          initialIsOpen
          load={import("@tanstack/react-table-devtools").then(
            ({ ReactTableDevtools }) => ({
              default: ReactTableDevtools,
            }),
          )}
        />
      ) : null,
    [isDevtools, table],
  );

  return (
    <React.Fragment>
      {tableDevtoolsToJsx}
      <Table className={cn("relative w-full", className)} {...props}>
        <TableHeader className="bg-muted/50">
          <For
            each={table.getHeaderGroups()}
            children={(headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                <For
                  each={headerGroup.headers}
                  children={(header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )}
                />
              </TableRow>
            )}
          />
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            <For
              each={table.getRowModel().rows}
              children={(row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  <For
                    each={row.getVisibleCells()}
                    children={(cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    )}
                  />
                </TableRow>
              )}
            />
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
export default DataTable;
