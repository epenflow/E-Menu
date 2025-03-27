import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import DiningTable from "~/pages/private/dining-table";
import { diningTableSchema } from "~/services/dining-table";

export const Route = createFileRoute("/_private/dining-table")({
  component: DiningTable,
  validateSearch: zodValidator(diningTableSchema),
  loaderDeps: (deps) => deps,
});
