import { createLazyFileRoute } from "@tanstack/react-router";
import For from "~/components/utils/for";
import { useAuth } from "~/lib/services/auth";

export const Route = createLazyFileRoute("/_private/settings/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, token } = useAuth();
  return (
    <div>
      <p>username : {user?.username}</p>
      <For
        each={token?.abilities}
        children={(ability, key) => <p key={`${key}-${ability}`}>{ability}</p>}
      />
    </div>
  );
}
