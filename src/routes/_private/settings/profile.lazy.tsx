import { useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_private/settings/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQueryClient();

  console.log(query.getQueryData(["auth"]));

  return <div>Hello "/_private/settings/profile"!</div>;
}
