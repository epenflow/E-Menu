import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_private/settings/password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_private/settings/password"!</div>;
}
