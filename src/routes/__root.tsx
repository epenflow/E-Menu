import { createRootRouteWithContext } from "@tanstack/react-router";
import Pages from "~/pages";

type RouteContext = {
  auth?: boolean;
};
export const Route = createRootRouteWithContext<RouteContext>()({
  component: Pages,
});
