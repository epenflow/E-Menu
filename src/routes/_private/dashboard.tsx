import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/lib/services/auth";

export const Route = createFileRoute("/_private/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { signOut } = useAuth();
  return (
    <div>
      <Button onClick={signOut}>sign - out</Button>
    </div>
  );
}
