import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import RouterPending from "~/components/router/router-pending";
import { routeTree } from "~/routeTree.gen";
import type { AuthContextValues } from "../services/auth";

const router = (ctx: { query: QueryClient; auth: AuthContextValues }) => {
  return createRouter({
    context: ctx,
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPendingComponent: RouterPending,
  });
};
export default router;

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof router>;
  }
}
