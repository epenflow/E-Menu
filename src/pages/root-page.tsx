import { Outlet } from "@tanstack/react-router";
import React from "react";

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
  Toaster: React.lazy(() =>
    import("~/components/ui/sonner").then(({ Toaster }) => ({
      default: Toaster,
    })),
  ),
};
