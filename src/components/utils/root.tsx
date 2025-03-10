import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import type { Root } from "react-dom/client";
import router from "~/lib/router";

const Root = () => {
  const rootToDisplay = React.useMemo(
    () => (
      <>
        <RouterProvider router={router()} />
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
