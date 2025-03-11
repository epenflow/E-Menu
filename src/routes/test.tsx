import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { paginationSchema } from "~/hooks/pagination";
import { productsQueryOptions } from "~/lib/test";
import Test from "~/pages/test";

export const Route = createFileRoute("/test")({
  component: Test,
  validateSearch: zodValidator(paginationSchema),
  loaderDeps: (deps) => deps,
  loader: ({ deps, context }) => {
    return context.queryClient.ensureQueryData(
      productsQueryOptions(deps.search),
    );
  },
});
