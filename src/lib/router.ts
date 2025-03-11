import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "~/routeTree.gen";

export const queryClient = new QueryClient();

const router = () => {
  return createRouter({
    context: {
      queryClient,
    },
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
