import { useAppForm } from "~/hooks/form-hook";
import { addDiningTableSchema } from "./schema";
import type { AddDiningTableSchema } from "./type";

export const useAddDiningTableForm = () => {
  return useAppForm({
    defaultValues: {
      name: "",
      description: "",
    } as AddDiningTableSchema,
    validators: {
      onChangeAsync: addDiningTableSchema,
      onChangeAsyncDebounceMs: 500,
    },
  });
};
