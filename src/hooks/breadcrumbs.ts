import { useLocation } from "@tanstack/react-router";
import React from "react";
import type { FileRouteTypes } from "~/routeTree.gen";

type BreadcrumbItem = {
  title: string;
  to?: FileRouteTypes["to"];
  isPage?: boolean;
};
const breadcrumbRoutes: Partial<
  Record<FileRouteTypes["to"], BreadcrumbItem[]>
> = {
  "/dashboard": [{ title: "Dashboard", isPage: true }],
  "/settings/profile": [
    { title: "Settings" },
    { title: "Profile", isPage: true },
  ],
  "/settings/password": [
    { title: "Settings" },
    { title: "Password", isPage: true },
  ],
};
const useBreadcrumbs = () => {
  const { pathname } = useLocation();

  const toRoute = React.useCallback(
    (route: string): route is keyof typeof breadcrumbRoutes => {
      return route in breadcrumbRoutes;
    },
    [],
  );

  return React.useMemo(() => {
    if (toRoute(pathname)) {
      return breadcrumbRoutes[pathname] || [];
    }

    return [];
  }, [pathname, toRoute]);
};
export default useBreadcrumbs;
