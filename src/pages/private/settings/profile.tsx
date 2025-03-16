import type { DeepKeys } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Block, Heading, Text } from "~/components/ui/typography";
import For from "~/components/utils/for";
import { useFormOnSubmit } from "~/hooks/form";
import SettingsLayout from "~/layouts/settings-layout";
import {
  useUpdateProfileForm,
  type UpdateProfileSchema,
} from "~/lib/services/profile";

const Profile = () => {
  const { nameFields, credentialFields } = resources;
  const updateProfileForm = useUpdateProfileForm();
  const onSubmit = useFormOnSubmit(updateProfileForm.handleSubmit);

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
              each={nameFields}
              children={({ name, label }, key) => (
                <updateProfileForm.AppField
                  key={`${name}-${key}`}
                  name={name}
                  children={(field) => (
                    <field.FieldItem>
                      <field.FieldLabel>{label}</field.FieldLabel>
                      <field.FieldControl>
                        <Input
                          defaultValue={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </field.FieldControl>
                      <field.FieldMessage />
                    </field.FieldItem>
                  )}
                />
              )}
            />
          </div>

          <For
            each={credentialFields}
            children={({ name, label }, key) => (
              <updateProfileForm.AppField
                key={`${name}-${key}`}
                name={name}
                children={(field) => (
                  <field.FieldItem>
                    <field.FieldLabel>{label}</field.FieldLabel>
                    <field.FieldControl>
                      <Input
                        defaultValue={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.FieldControl>
                    <field.FieldMessage />
                  </field.FieldItem>
                )}
              />
            )}
          />

          <updateProfileForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                isPending={isSubmitting}
                disabled={!canSubmit}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            )}
          />
        </form>
      </div>
    </SettingsLayout>
  );
};
export default Profile;

type Fields = {
  name: DeepKeys<UpdateProfileSchema>;
  label: string;
};
const resources = {
  nameFields: [
    { name: "fName", label: "First name" },
    { name: "lName", label: "Last name" },
  ] satisfies Fields[],
  credentialFields: [
    { name: "username", label: "Username" },
    { name: "email", label: "Email" },
  ] satisfies Fields[],
};
