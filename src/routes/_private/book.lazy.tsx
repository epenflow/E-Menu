import { createLazyFileRoute } from "@tanstack/react-router";
import Book from "~/pages/private/book";

export const Route = createLazyFileRoute("/_private/book")({
  component: Book,
});
