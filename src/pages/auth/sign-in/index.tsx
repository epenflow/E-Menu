import BreadcrumbNavigation from "~/components/breadcrumb-navigation";
import Pattern from "~/components/ui/pattern";
import {
  SignInCard,
  SignInCardContent,
  SignInCardHeader,
} from "./sign-in-card";
import SignInForm from "./sign-in-form";

const SignIn = () => {
  return (
    <main className="min-h-dvh h-full w-full inline-flex items-center justify-center relative bg-background">
      <Pattern pattern="polka" />
      <SignInCard>
        <SignInCardHeader>
          <BreadcrumbNavigation />
        </SignInCardHeader>
        <SignInCardContent>
          <SignInForm />
        </SignInCardContent>
      </SignInCard>
    </main>
  );
};
export default SignIn;
