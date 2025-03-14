import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_private/settings/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <p>sd</p>;
}
