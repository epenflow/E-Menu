import Breadcrumbs from "~/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardOuter } from "~/components/ui/card";
import Pattern from "~/components/ui/pattern";
import SignInForm from "./sign-in-form";

const SignIn = () => {
  return (
    <main className="relative min-h-dvh w-full flex">
      <Pattern pattern="polka" />
      <CardOuter className="relative z-10 max-w-xs md:max-w-sm w-full m-auto">
        <Card>
          <CardHeader>
            <Breadcrumbs />
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </CardOuter>
    </main>
  );
};
export default SignIn;
