import { createLazyFileRoute } from "@tanstack/react-router";
import Dashboard from "~/pages/private/dashboard";

export const Route = createLazyFileRoute("/_private/dashboard")({
  component: Dashboard,
});
