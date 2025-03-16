import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import type {
  ApiErrorResponse,
  OnSubmitAsyncValidatorProps,
} from "~/lib/types";

const fieldComponents = {
  FieldItem: React.lazy(() =>
    import("~/components/ui/form/field").then((res) => ({
      default: res.FieldItem,
    })),
  ),
  FieldLabel: React.lazy(() =>
    import("~/components/ui/form/field").then((res) => ({
      default: res.FieldLabel,
    })),
  ),
  FieldControl: React.lazy(() =>
    import("~/components/ui/form/field").then((res) => ({
      default: res.FieldControl,
    })),
  ),
  FieldMessage: React.lazy(() =>
    import("~/components/ui/form/field").then((res) => ({
      default: res.FieldMessage,
    })),
  ),
  FieldDescription: React.lazy(() =>
    import("~/components/ui/form/field").then((res) => ({
      default: res.FieldDescription,
    })),
  ),
  FieldControlWithIcon: React.lazy(() =>
    import("~/components/ui/form/field").then((res) => ({
      default: res.FieldControlWithIcon,
    })),
  ),
};

const formComponents = {
  FormMessage: React.lazy(() =>
    import("~/components/ui/form").then((res) => ({
      default: res.FormMessage,
    })),
  ),
};

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { withForm, useAppForm } = createFormHook({
  fieldComponents,
  formComponents,
  fieldContext,
  formContext,
});

export const useFormErrorReporter = () => {
  return React.useCallback((error: unknown) => {
    if (error instanceof AxiosError && error.response) {
      const { errors }: ApiErrorResponse = error.response.data;
      const fields = Object.create(null);
      const form: string[] = [];

      errors.forEach((err) => {
        if ("field" in err) {
          fields[err.field] = [
            {
              ...err,
            },
          ];
        } else if ("message" in err) {
          form.push(err.message);
        }
      });

      return {
        form,
        fields,
      };
    }

    return undefined;
  }, []);
};

export const useFormOnSubmitAsyncValidator = <
  TData,
  TError,
  TVariables,
  TContext,
>(
  mutationAsync: UseMutateAsyncFunction<TData, TError, TVariables, TContext>,
) => {
  const formErrorReporter = useFormErrorReporter();

  return React.useCallback(
    async (props: OnSubmitAsyncValidatorProps<TVariables>) => {
      try {
        await mutationAsync(props.value);
      } catch (error) {
        return formErrorReporter(error);
      }
      return undefined;
    },
    [formErrorReporter, mutationAsync],
  );
};

export const useFormOnSubmit = (fn: VoidFunction) => {
  return React.useCallback(
    <T>(e: React.FormEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();
      fn();
    },
    [fn],
  );
};
