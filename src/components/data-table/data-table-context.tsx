import type { Table } from "@tanstack/react-table";
import React from "react";

type DataTableContextValues<T> = Table<T>;

export const DataTableContext = React.createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataTableContextValues<any> | undefined
>(undefined);

export const useDataTableContext = () => {
  const context = React.useContext(DataTableContext);
  if (typeof context === "undefined") {
    throw new Error(
      "useDataTableContext should be used within <DataTableContext/>",
    );
  }

  return context;
};
