import { Outlet } from "@tanstack/react-router";
import React from "react";

const Pages = () => {
  const { TanstackRouterDevTools, Invoke } = resources;

  return (
    <React.Suspense>
      <Outlet />
      <Invoke />
      <TanstackRouterDevTools />
    </React.Suspense>
  );
};

export default Pages;

const resources = {
  TanstackRouterDevTools: import.meta.env.DEV
    ? React.lazy(() =>
        import("@tanstack/router-devtools").then(
          ({ TanStackRouterDevtools }) => ({
            default: TanStackRouterDevtools,
          }),
        ),
      )
    : () => null,
  Invoke: React.lazy(() => import("~/components/utils/invoke")),
};
