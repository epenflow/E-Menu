import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import type { Root } from "react-dom/client";
import router, { queryClient } from "~/lib/router";

const Root = () => {
  const rootToDisplay = React.useMemo(
    () => (
      <>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router()} />
        </QueryClientProvider>
      </>
    ),
    [],
  );

  if (import.meta.env.DEV) {
    return <React.StrictMode>{rootToDisplay}</React.StrictMode>;
  }

  return rootToDisplay;
};
export default Root;
