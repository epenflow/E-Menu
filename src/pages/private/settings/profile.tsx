import { Input } from "~/components/ui/input";
import { Block, Heading, Text } from "~/components/ui/typography";
import For from "~/components/utils/for";
import { useFormHookOnSubmit } from "~/hooks/form-hook";
import SettingsLayout from "~/layouts/settings-layout";
import {
  useUpdateProfileForm,
  type UpdateProfileSchemaField,
} from "~/lib/services/profile";

const Profile = () => {
  const { userInfoFields, userCredentialFields } = resources;
  const updateForm = useUpdateProfileForm();
  const onSubmit = useFormHookOnSubmit(updateForm.handleSubmit);

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
          <div className="grid grid-cols-2 gap-2">
            <For
              each={userInfoFields}
              children={({ name, label }, key) => (
                <updateForm.AppField
                  key={`${name}-${key}`}
                  name={name}
                  children={(field) => (
                    <field.FormFieldItem>
                      <field.FormFieldLabel>{label}</field.FormFieldLabel>
                      <field.FormFieldControl>
                        <Input
                          defaultValue={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </field.FormFieldControl>
                      <field.FormFieldMessage />
                    </field.FormFieldItem>
                  )}
                />
              )}
            />
          </div>

          <For
            each={userCredentialFields}
            children={({ name, label }, key) => (
              <updateForm.AppField
                key={`${name}-${key}`}
                name={name}
                children={(field) => (
                  <field.FormFieldItem>
                    <field.FormFieldLabel>{label}</field.FormFieldLabel>
                    <field.FormFieldControl>
                      <Input
                        defaultValue={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.FormFieldControl>
                    <field.FormFieldMessage />
                  </field.FormFieldItem>
                )}
              />
            )}
          />

          <updateForm.AppForm>
            <updateForm.FormButton>
              {({ isPending }) => (isPending ? "Updating..." : "Update")}
            </updateForm.FormButton>
          </updateForm.AppForm>
        </form>
      </div>
    </SettingsLayout>
  );
};
export default Profile;

const resources = {
  userInfoFields: [
    { name: "fName", label: "First name" },
    { name: "lName", label: "Last name" },
  ] satisfies UpdateProfileSchemaField[],
  userCredentialFields: [
    { name: "username", label: "Username" },
    { name: "email", label: "Email" },
  ] satisfies UpdateProfileSchemaField[],
};
