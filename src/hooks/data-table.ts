import {
  getCoreRowModel,
  useReactTable,
  type Table,
  type TableOptions,
} from "@tanstack/react-table";
import React from "react";

export const DataTableContext = React.createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Table<any> | undefined
>(undefined);

export const useDataTableContext = () => {
  const context = React.useContext(DataTableContext);

  if (typeof context === "undefined")
    throw new Error(
      "useDataTableContext should be used within <DataTableContext/>",
    );

  return context;
};

type UseDataTableProps<T> = Omit<TableOptions<T>, "getCoreRowModel">;
export const useDataTable = <T>(props: UseDataTableProps<T>) => {
  return useReactTable({
    ...props,
    getCoreRowModel: getCoreRowModel(),
  });
};
