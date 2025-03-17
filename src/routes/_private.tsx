import { createFileRoute, redirect } from "@tanstack/react-router";
import PrivateLayout from "~/layouts/private-layout";
import { isTokenExpires } from "~/lib/utils";

export const Route = createFileRoute("/_private")({
  component: PrivateLayout,
  beforeLoad: async ({ context: { auth } }) => {
    if (typeof auth.token?.expiresAt !== "undefined") {
      if (isTokenExpires(auth.token.expiresAt)) {
        console.log("token expires trigger");
        auth.signOut();
      }
    }

    if (auth.status === "UNAUTHENTICATED") {
      throw redirect({
        to: "/sign-in",
      });
    }
  },
});
