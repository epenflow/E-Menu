import { Outlet } from "@tanstack/react-router";
import React from "react";

const Pages = () => {
  const { TanstackRouterDevTools, TanstackQueryDevTools, Invoke } = resources;

  return (
    <React.Suspense>
      <Outlet />
      <Invoke />
      <TanstackQueryDevTools />
      <TanstackRouterDevTools position="top-right" />
    </React.Suspense>
  );
};

export default Pages;

const resources = {
  TanstackRouterDevTools: import.meta.env.DEV
    ? React.lazy(() =>
        import("@tanstack/react-router-devtools").then(
          ({ TanStackRouterDevtools }) => ({
            default: TanStackRouterDevtools,
          }),
        ),
      )
    : () => null,
  TanstackQueryDevTools: React.lazy(() =>
    import("@tanstack/react-query-devtools").then(({ ReactQueryDevtools }) => ({
      default: ReactQueryDevtools,
    })),
  ),
  Invoke: React.lazy(() => import("~/components/utils/invoke")),
};
