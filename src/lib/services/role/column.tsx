import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";
import For from "~/components/utils/for";
import type { Role } from "~/lib/types";

const roleColumnHelper = createColumnHelper<Role>();

const tagsColor = {
  create: {
    badge:
      "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10",
    dot: "bg-[#10b981]",
  },
  read: {
    badge:
      "text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10",
    dot: "bg-[#0ea5e9]",
  },
  delete: {
    badge:
      "text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10",
    dot: "bg-[#ec4899]",
  },
  update: {
    badge:
      "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20 hover:bg-[#f97316]/10",
    dot: "bg-[#f97316]",
  },
} as Record<string, Record<"badge" | "dot", string>>;

export const roleColumns = [
  roleColumnHelper.accessor("name", {
    header: "Name",
    cell: (props) => props.getValue(),
  }),
  roleColumnHelper.accessor("abilities", {
    header: "Ability",
    cell: (props) => (
      <div className="flex flex-wrap gap-1">
        <For
          each={props.getValue()}
          children={(ability, key) => (
            <Badge
              key={`${key}-${ability}`}
              className={tagsColor[ability].badge}>
              {ability}
            </Badge>
          )}
        />
      </div>
    ),
  }),
  roleColumnHelper.accessor("createdAt", {
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
  roleColumnHelper.accessor("updatedAt", {
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
