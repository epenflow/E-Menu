import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import Pages from "~/pages";

type RouteContext = {
  queryClient: QueryClient;
};
export const Route = createRootRouteWithContext<RouteContext>()({
  component: Pages,
});
