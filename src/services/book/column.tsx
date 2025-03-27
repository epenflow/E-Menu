import { createColumnHelper } from "@tanstack/react-table";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import type { Book } from ".";

const bookColumnHelpers = createColumnHelper<Book>();

export const bookColumns = [
  bookColumnHelpers.accessor("id", {
    header: "Id",
    cell: (props) => {
      const onCopy = () => {
        navigator.clipboard.writeText(String(props.getValue()));
        toast.success(`Copy ${props.getValue()}`);
      };

      return (
        <div className="inline-flex items-center justify-center gap-1">
          <Button
            size="icon"
            className="size-7"
            variant="ghost"
            onClick={onCopy}>
            <Copy />
          </Button>
          <span>{props.getValue()}</span>
        </div>
      );
    },
  }),
  bookColumnHelpers.accessor("name", {
    header: "Name",
    cell: (props) => props.getValue(),
  }),
  bookColumnHelpers.accessor("genre", {
    header: "Genre",
    cell: (props) => props.getValue(),
  }),
  bookColumnHelpers.accessor("author", {
    header: "Author",
    cell: (props) => props.getValue(),
  }),
  bookColumnHelpers.accessor("publisher", {
    header: "Publisher",
    cell: (props) => props.getValue(),
  }),
  bookColumnHelpers.accessor("createdAt", {
    header: "Created",
    cell: (props) =>
      new Date(props.getValue()).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  }),
  bookColumnHelpers.accessor("updatedAt", {
    header: "Updated",
    cell: (props) =>
      new Date(props.getValue()).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  }),
];
