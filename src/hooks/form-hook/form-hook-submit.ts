import type { FormApi } from "@tanstack/react-form";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import React from "react";
import { useFormHookError } from "./form-hook-error";

type OnSubmitAsyncValidatorProps<T> = {
  value: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formApi: FormApi<T, any, any, any, any, any, any, any, any, any>;
  signal: AbortSignal;
};

export const useFormHookOnSubmitAsyncValidator = <
  TData,
  TError,
  TVariables,
  TContext,
>(
  fn: UseMutateAsyncFunction<TData, TError, TVariables, TContext>,
) => {
  const formHookError = useFormHookError();

  const onSubmitAsync = React.useCallback(
    async (props: OnSubmitAsyncValidatorProps<TVariables>) => {
      try {
        await fn(props.value);
      } catch (error) {
        return formHookError(error);
      }
      return;
    },
    [formHookError, fn],
  );

  return onSubmitAsync;
};

export const useFormHookOnSubmit = (fn: VoidFunction) => {
  return React.useCallback(
    <T>(e: React.FormEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();
      fn();
    },
    [fn],
  );
};
