import { createLazyFileRoute } from "@tanstack/react-router";
import Profile from "~/pages/private/settings/profile";

export const Route = createLazyFileRoute("/_private/settings/profile")({
  component: Profile,
});
