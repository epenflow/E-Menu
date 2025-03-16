import { createLazyFileRoute } from "@tanstack/react-router";
import Password from "~/pages/private/settings/password";

export const Route = createLazyFileRoute("/_private/settings/password")({
  component: Password,
});
