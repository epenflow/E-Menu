import type { DeepKeys } from "@tanstack/react-form";
import type { HTMLInputAutoCompleteAttribute } from "react";
import { Button } from "~/components/ui/button";
import { InputPassword } from "~/components/ui/input";
import { Block, Heading, Text } from "~/components/ui/typography";
import For from "~/components/utils/for";
import { useFormOnSubmit } from "~/hooks/form";
import SettingsLayout from "~/layouts/settings-layout";
import {
  useUpdatePasswordForm,
  type UpdatePasswordSchema,
} from "~/lib/services/profile";

const Password = () => {
  const { updatePasswordFields } = resources;
  const updatePasswordForm = useUpdatePasswordForm();
  const onSubmit = useFormOnSubmit(updatePasswordForm.handleSubmit);

  return (
    <SettingsLayout>
      <div className="max-w-xl space-y-6">
        <Block className="gap-1 mb-6">
          <Heading level={3} className="font-medium">
            Update profile
          </Heading>
          <Text>
            Update your account's profile information and email address.
          </Text>
        </Block>

        <form className="space-y-4" onSubmit={onSubmit}>
          <For
            each={updatePasswordFields}
            children={({ name, label, autoComplete }, key) => (
              <updatePasswordForm.AppField
                key={`${key}-${name}`}
                name={name}
                children={(field) => (
                  <field.FieldItem>
                    <field.FieldLabel>{label}</field.FieldLabel>
                    <field.FieldControl>
                      <InputPassword
                        autoComplete={autoComplete}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="********"
                      />
                    </field.FieldControl>
                    <field.FieldMessage />
                  </field.FieldItem>
                )}
              />
            )}
          />

          <updatePasswordForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                isPending={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            )}
          />
        </form>
      </div>
    </SettingsLayout>
  );
};
export default Password;

type Field = {
  name: DeepKeys<UpdatePasswordSchema>;
  label: string;
  autoComplete: HTMLInputAutoCompleteAttribute;
};

const resources = {
  updatePasswordFields: [
    {
      name: "currentPassword",
      label: "Current password",
      autoComplete: "current-password",
    },
    {
      name: "newPassword",
      label: "New password",
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      autoComplete: "new-password",
    },
  ] satisfies Field[],
};
