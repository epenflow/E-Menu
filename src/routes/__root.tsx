import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import type { AuthContextValues } from "~/lib/services/auth";
import RootPage from "~/pages/root-page";

type RouteContext = {
  query: QueryClient;
  auth: AuthContextValues;
};
export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootPage,
});
