import { Link } from "@tanstack/react-router";
import { Lock, User } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input, InputPassword } from "~/components/ui/input";
import useEventCallback from "~/hooks/event-callback";
import { useSignInForm } from "~/lib/services/auth";

import { cn } from "~/lib/utils";

const SignInForm = () => {
  const signInForm = useSignInForm();

  const onSubmit = useEventCallback(<T,>(e: React.FormEvent<T>) => {
    e.preventDefault();
    e.stopPropagation();
    signInForm.handleSubmit();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6 grid">
      <div className="space-y-6">
        <signInForm.AppField
          name="username"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Username</field.FormLabel>
              <field.FormFieldWithIcon Icon={User}>
                <field.FormControl>
                  <Input
                    autoComplete="username"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="example"
                  />
                </field.FormControl>
              </field.FormFieldWithIcon>
              <field.FormDescription>
                Enter your username.
              </field.FormDescription>
              <field.FormMessage />
            </field.FormItem>
          )}
        />

        <signInForm.AppField
          name="password"
          children={(field) => (
            <field.FormItem>
              <div className="grid grid-cols-2">
                <field.FormLabel>Password</field.FormLabel>
                <Link
                  to="/"
                  className={cn(
                    buttonVariants({
                      variant: "link",
                    }),
                    "p-0 h-auto justify-end text-sm leading-none",
                  )}>
                  Forgot password?
                </Link>
              </div>
              <field.FormFieldWithIcon Icon={Lock}>
                <field.FormControl>
                  <InputPassword
                    autoComplete="current-password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="**************"
                  />
                </field.FormControl>
              </field.FormFieldWithIcon>
              <field.FormDescription>
                Enter your account password.
              </field.FormDescription>
              <field.FormMessage />
            </field.FormItem>
          )}
        />
      </div>

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
