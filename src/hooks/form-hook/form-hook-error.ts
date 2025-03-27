import { AxiosError, HttpStatusCode } from "axios";
import React from "react";
import type { ApiErrorResponse } from "~/lib/types";
import { useAuth } from "~/services/auth";

export const useFormHookError = () => {
  const { deleteUserCredentials } = useAuth();

  const formHookError = React.useCallback(
    (error: unknown) => {
      if (error instanceof AxiosError && error.response) {
        if (error.status === HttpStatusCode.Unauthorized) {
          deleteUserCredentials();
          return;
        }

        const { errors }: ApiErrorResponse = error.response.data;
        const fields = Object.create(null);
        const form: string[] = [];

        if (typeof errors !== "undefined") {
          errors.forEach((err) => {
            if ("field" in err) {
              fields[err.field] = [{ ...err }];
            } else if ("message" in err) {
              form.push(err.message);
            }
          });
          return { form, fields };
        }

        return;
      }

      return;
    },
    [deleteUserCredentials],
  );

  return formHookError;
};
