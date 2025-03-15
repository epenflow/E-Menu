import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { paginationSchema } from "~/hooks/pagination";
import { allRoleQueryOptions } from "~/lib/services/role";

export const Route = createFileRoute("/_private/role")({
  validateSearch: zodValidator(paginationSchema),
  loaderDeps: (deps) => deps,
  loader: ({ deps, context }) => {
    return context.query.ensureQueryData(allRoleQueryOptions(deps.search));
  },
});
