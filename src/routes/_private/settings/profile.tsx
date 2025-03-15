import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/settings/profile")({
  component: Outlet,
  beforeLoad: async ({ context: { auth } }) => {
    if (auth.status === "PENDING") {
      return;
    }
    if (!auth.token?.abilities.includes("edit")) {
      throw redirect({ to: "/dashboard" });
    }
  },
});
