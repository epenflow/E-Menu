import { createFormHook } from "@tanstack/react-form";
import { withLazy } from "~/lib/utils";
import { fieldContext, formContext } from "./form-hook-context";

const fieldComponents = {
  FormFieldItem: withLazy(
    import("~/components/form/form-field/form-field-item"),
  ),
  FormFieldControl: withLazy(
    import("~/components/form/form-field/form-field-control"),
  ),
  FormFieldControlIcon: withLazy(
    import("~/components/form/form-field/form-field-control-icon"),
  ),
  FormFieldDescription: withLazy(
    import("~/components/form/form-field/form-field-description"),
  ),
  FormFieldLabel: withLazy(
    import("~/components/form/form-field/form-field-label"),
  ),
  FormFieldMessage: withLazy(
    import("~/components/form/form-field/form-field-message"),
  ),
};

const formComponents = {
  FormMessage: withLazy(import("~/components/form/form-message")),
  FormButton: withLazy(import("~/components/form/form-button")),
};

export const { useAppForm, withForm } = createFormHook({
  fieldComponents,
  formComponents,
  fieldContext,
  formContext,
});
