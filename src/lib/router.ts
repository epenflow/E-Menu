import { createRouter } from "@tanstack/react-router";
import { routeTree } from "~/routeTree.gen";

const router = () => {
  return createRouter({
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
