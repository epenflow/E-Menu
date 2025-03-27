import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import RootPage from "~/pages/root-page";
import type { AuthContextValues } from "~/services/auth";

type RouteContext = {
  query: QueryClient;
  auth: AuthContextValues;
};
export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootPage,
});
