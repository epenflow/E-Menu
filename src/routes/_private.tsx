import { createFileRoute, redirect } from "@tanstack/react-router";
import PrivateLayout from "~/layouts/private-layout";

export const Route = createFileRoute("/_private")({
  component: PrivateLayout,
  beforeLoad: async ({ context: { auth } }) => {
    if (auth.status === "UPDATE_USER") {
      return;
    }

    if (auth.status === "UNAUTHENTICATED") {
      throw redirect({
        to: "/sign-in",
      });
    }
  },
});
