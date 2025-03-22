import { createFormHook } from "@tanstack/react-form";
import React from "react";
import { fieldContext, formContext } from "./form-hook-context";

const fieldComponents = {
  FormFieldItem: React.lazy(
    () => import("~/components/form/form-field/form-field-item"),
  ),
  FormFieldControl: React.lazy(
    () => import("~/components/form/form-field/form-field-control"),
  ),
  FormFieldControlIcon: React.lazy(
    () => import("~/components/form/form-field/form-field-control-icon"),
  ),
  FormFieldDescription: React.lazy(
    () => import("~/components/form/form-field/form-field-description"),
  ),
  FormFieldLabel: React.lazy(
    () => import("~/components/form/form-field/form-field-label"),
  ),
  FormFieldMessage: React.lazy(
    () => import("~/components/form/form-field/form-field-message"),
  ),
};

const formComponents = {
  FormMessage: React.lazy(() => import("~/components/form/form-message")),
  FormButton: React.lazy(() => import("~/components/form/form-button")),
};

export const { useAppForm, withForm } = createFormHook({
  fieldComponents,
  formComponents,
  fieldContext,
  formContext,
});
