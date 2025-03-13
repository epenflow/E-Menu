import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import Pages from "~/pages";

type RouteContext = {
  query: QueryClient;
};
export const Route = createRootRouteWithContext<RouteContext>()({
  component: Pages,
});
