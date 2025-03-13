import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { paginationSchema } from "~/hooks/pagination";
import { productsQueryOptions } from "~/lib/test";
import Dashboard from "~/pages/dashboard";

export const Route = createFileRoute("/_private/dashboard")({
  component: Dashboard,
  validateSearch: zodValidator(paginationSchema),
  loaderDeps: (deps) => deps,
  loader: ({ deps, context }) => {
    return context.query.ensureQueryData(productsQueryOptions(deps.search));
  },
});
