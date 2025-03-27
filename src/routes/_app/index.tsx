import { createFileRoute } from "@tanstack/react-router";
import Home from "~/pages/app/home";

export const Route = createFileRoute("/_app/")({
  component: Home,
});
