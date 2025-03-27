import { InputPassword } from "~/components/ui/input";
import { Block, Heading, Text } from "~/components/ui/typography";
import For from "~/components/utils/for";
import { useFormHookOnSubmit } from "~/hooks/form-hook";
import SettingsLayout from "~/layouts/settings-layout";
import {
  useUpdatePasswordForm,
  type UpdatePasswordSchemaField,
} from "~/lib/services/profile";

const Password = () => {
  const { updatePasswordFields } = resources;
  const form = useUpdatePasswordForm();
  const onSubmit = useFormHookOnSubmit(form.handleSubmit);

  return (
    <SettingsLayout>
      <div className="max-w-xl space-y-6">
        <Block className="gap-1 mb-6">
          <Heading level={3} className="font-medium">
            Change Password
          </Heading>
          <Text>
            Ensure your account is using a long, random password to stay secure.
          </Text>
        </Block>

        <form className="space-y-4" onSubmit={onSubmit}>
          <For
            each={updatePasswordFields}
            children={({ name, label, autoComplete }, key) => (
              <form.AppField
                key={`${key}-${name}`}
                name={name}
                children={(field) => (
                  <field.FormFieldItem>
                    <field.FormFieldLabel>{label}</field.FormFieldLabel>
                    <field.FormFieldControl>
                      <InputPassword
                        autoComplete={autoComplete}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="********"
                      />
                    </field.FormFieldControl>
                    <field.FormFieldMessage />
                  </field.FormFieldItem>
                )}
              />
            )}
          />

          <form.AppForm>
            <form.FormButton>
              {({ isPending }) => (isPending ? "Updating..." : "Update")}
            </form.FormButton>
          </form.AppForm>
        </form>
      </div>
    </SettingsLayout>
  );
};
export default Password;

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
  ] satisfies UpdatePasswordSchemaField[],
};
