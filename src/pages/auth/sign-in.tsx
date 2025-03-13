import AuthCard from "~/components/base/auth/auth-card";
import SignInForm from "~/components/base/auth/sign-in-form";
import * as RouteGen from "~/routeTree.gen";
const SignIn = () => {
  const { breadcrumbs } = resources;
  return (
    <section className="w-full min-h-dvh h-auto flex px-4">
      <AuthCard breadcrumbs={breadcrumbs}>
        <SignInForm />
      </AuthCard>
    </section>
  );
};
export default SignIn;

const resources = {
  breadcrumbs: [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "Sign In",
    },
  ] satisfies {
    title: string;
    to?: RouteGen.FileRouteTypes["to"];
  }[],
};
