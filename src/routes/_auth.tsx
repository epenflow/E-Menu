import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: Outlet,
  beforeLoad({ context: { auth } }) {
    if (auth.status === "AUTHENTICATED") {
      throw redirect({ to: "/dashboard" });
    }
  },
});
