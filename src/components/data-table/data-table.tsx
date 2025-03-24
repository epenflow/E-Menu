import { flexRender } from "@tanstack/react-table";
import React from "react";
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
import { useDataTableContext } from "./data-table-context";

type DataTableProps = {
  isDevtools?: boolean;
} & React.ComponentProps<"table">;
const DataTable: React.FC<DataTableProps> = ({
  isDevtools,
  className,
  ...props
}) => {
  const table = useDataTableContext();

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
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center">
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
