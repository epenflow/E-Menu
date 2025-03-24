import { useDataTable, type UseDataTableProps } from "~/hooks/data-table";
import { DataTableContext } from "./data-table-context";

type DataTableProviderProps<T> = UseDataTableProps<T> & React.PropsWithChildren;
export const DataTableProvider = <T,>({
  children,
  ...props
}: DataTableProviderProps<T>) => {
  const table = useDataTable({
    ...props,
  });

  return <DataTableContext value={table}>{children}</DataTableContext>;
};
