import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import type { Root } from "react-dom/client";
import query from "~/lib/query";
import router from "~/lib/router";

const Root = () => {
  const InnerRoot = () => {
    return (
      <>
        <QueryClientProvider client={query}>
          <RouterProvider router={router({ query })} />
        </QueryClientProvider>
      </>
    );
  };

  if (import.meta.env.DEV) {
    return (
      <React.StrictMode>
        <InnerRoot />
      </React.StrictMode>
    );
  }

  return <InnerRoot />;
};
export default Root;
