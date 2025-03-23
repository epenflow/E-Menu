import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import query from "~/lib/query";
import router from "~/lib/router";
import { AuthContextProvider, useAuth } from "~/lib/services/auth";

const RouterWithContext = () => {
  const auth = useAuth();

  return <RouterProvider router={router({ query, auth })} />;
};

const RootApp = () => {
  const InnerRootApp = () => {
    return (
      <>
        <QueryClientProvider client={query}>
          <AuthContextProvider>
            <RouterWithContext />
          </AuthContextProvider>
        </QueryClientProvider>
      </>
    );
  };

  if (import.meta.env.DEV) {
    return (
      <React.StrictMode>
        <InnerRootApp />
      </React.StrictMode>
    );
  }

  return <InnerRootApp />;
};
export default RootApp;
