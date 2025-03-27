import { Lock, User, type LucideIcon } from "lucide-react";
import { Input, InputPassword } from "~/components/ui/input";
import For from "~/components/utils/for";
import { useFormHookOnSubmit } from "~/hooks/form-hook";
import { useSignInForm, type SignInFieldSchema } from "~/services/auth";

const SignInForm = () => {
  const { signInField } = resources;
  const signInForm = useSignInForm();
  const onSubmit = useFormHookOnSubmit(signInForm.handleSubmit);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-3">
        <For
          each={signInField}
          children={(schemaField, key) => (
            <signInForm.AppField
              key={`${key}-${schemaField.name}`}
              name={schemaField.name}
              children={(field) => {
                return (
                  <field.FormFieldItem>
                    <field.FormFieldLabel>
                      {schemaField.label}
                    </field.FormFieldLabel>
                    <field.FormFieldControlIcon icon={<schemaField.icon />}>
                      <field.FormFieldControl>
                        {schemaField.name === "password" ? (
                          <InputPassword
                            placeholder={schemaField.placeholder}
                            autoComplete={schemaField.autoComplete}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        ) : (
                          <Input
                            placeholder={schemaField.placeholder}
                            autoComplete={schemaField.autoComplete}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        )}
                      </field.FormFieldControl>
                    </field.FormFieldControlIcon>
                    <field.FormFieldDescription>
                      {schemaField.description}
                    </field.FormFieldDescription>
                    <field.FormFieldMessage />
                  </field.FormFieldItem>
                );
              }}
            />
          )}
        />
      </div>

      <signInForm.AppForm>
        <signInForm.FormMessage />
      </signInForm.AppForm>
      <signInForm.AppForm>
        <signInForm.FormButton
          className="w-full"
          children={(props) => (props.isPending ? "Submitting..." : "Submit")}
        />
      </signInForm.AppForm>
    </form>
  );
};

const resources = {
  signInField: [
    {
      name: "username",
      label: "Username",
      autoComplete: "username",
      description: "Enter your username",
      placeholder: "example",
      icon: User,
    },
    {
      name: "password",
      label: "Password",
      autoComplete: "current-password",
      description: "Enter your password",
      placeholder: "*********",
      icon: Lock,
    },
  ] satisfies SignInFieldSchema<{ icon: LucideIcon }>,
};

export default SignInForm;
