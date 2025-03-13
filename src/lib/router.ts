import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "~/routeTree.gen";

const router = (ctx: { query: QueryClient }) => {
  return createRouter({
    context: ctx,
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
  });
};
export default router;

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof router>;
  }
}
