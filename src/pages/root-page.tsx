import { Outlet } from "@tanstack/react-router";
import React from "react";
import { withLazy } from "~/lib/utils";

const RootPage = () => {
  const { TanstackRouterDevTools, TanstackQueryDevTools, Invoke, Toaster } =
    resources;

  return (
    <React.Suspense>
      <Toaster />
      <Outlet />
      <Invoke />
      <TanstackQueryDevTools />
      <TanstackRouterDevTools />
    </React.Suspense>
  );
};

export default RootPage;

const resources = {
  TanstackRouterDevTools: import.meta.env.DEV
    ? withLazy(
        import("@tanstack/react-router-devtools").then(
          ({ TanStackRouterDevtools }) => ({
            default: TanStackRouterDevtools,
          }),
        ),
      )
    : () => null,
  TanstackQueryDevTools: import.meta.env.DEV
    ? withLazy(
        import("@tanstack/react-query-devtools").then(
          ({ ReactQueryDevtools }) => ({
            default: ReactQueryDevtools,
          }),
        ),
      )
    : () => null,
  Invoke: withLazy(import("~/components/utils/invoke")),
  Toaster: withLazy(
    import("~/components/ui/sonner").then(({ Toaster }) => ({
      default: Toaster,
    })),
  ),
};
