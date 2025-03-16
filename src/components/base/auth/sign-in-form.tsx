import type { DeepKeys } from "@tanstack/react-form";
import { Lock, Mail, type LucideIcon } from "lucide-react";
import { type HTMLInputAutoCompleteAttribute } from "react";
import { Button } from "~/components/ui/button";
import { Input, InputPassword } from "~/components/ui/input";
import For from "~/components/utils/for";
import { useFormOnSubmit } from "~/hooks/form";
import { useSignInForm, type SignInSchema } from "~/lib/services/auth";

const SignInForm = () => {
  const { signInFields } = resources;
  const signInForm = useSignInForm();
  const onSubmit = useFormOnSubmit(signInForm.handleSubmit);

  return (
    <form onSubmit={onSubmit} className="space-y-6 grid">
      <div className="space-y-6">
        <For
          each={signInFields}
          children={(
            { name, autoComplete, description, icon, label, placeholder },
            key,
          ) => (
            <signInForm.AppField
              key={`${key}-${name}`}
              name={name}
              children={(field) => (
                <field.FieldItem>
                  <field.FieldLabel>{label}</field.FieldLabel>
                  <field.FieldControlWithIcon Icon={icon}>
                    <field.FieldControl>
                      {name === "username" ? (
                        <Input
                          autoComplete={autoComplete}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder={placeholder}
                        />
                      ) : (
                        <InputPassword
                          autoComplete={autoComplete}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder={placeholder}
                        />
                      )}
                    </field.FieldControl>
                  </field.FieldControlWithIcon>
                  <field.FieldDescription>{description}</field.FieldDescription>
                  <field.FieldMessage />
                </field.FieldItem>
              )}
            />
          )}
        />
      </div>

      <signInForm.AppForm>
        <signInForm.FormMessage />
      </signInForm.AppForm>

      <signInForm.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" isPending={isSubmitting} disabled={!canSubmit}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        )}
      />
    </form>
  );
};
export default SignInForm;

type Field = {
  name: DeepKeys<SignInSchema>;
  autoComplete: HTMLInputAutoCompleteAttribute;
  label: string;
  description: string;
  placeholder: string;
  icon: LucideIcon;
};
const resources = {
  signInFields: [
    {
      name: "username",
      autoComplete: "username",
      label: "Username",
      description: "Enter your username",
      icon: Mail,
      placeholder: "example",
    },
    {
      name: "password",
      autoComplete: "current-password",
      label: "Password",
      description: "Enter your account password.",
      icon: Lock,
      placeholder: "**************",
    },
  ] satisfies Field[],
};
