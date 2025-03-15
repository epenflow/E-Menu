import { createLazyFileRoute } from "@tanstack/react-router";
import Role from "~/pages/private/role";

export const Route = createLazyFileRoute("/_private/role")({
  component: Role,
});
