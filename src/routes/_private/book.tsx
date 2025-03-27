import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { filterSchema } from "~/hooks/filters";
import { bookOptions } from "~/services/book";

export const Route = createFileRoute("/_private/book")({
  validateSearch: zodValidator(filterSchema),
  loaderDeps: (deps) => deps,
  loader: ({ deps, context }) => {
    return context.query.ensureQueryData(bookOptions(deps.search));
  },
});
