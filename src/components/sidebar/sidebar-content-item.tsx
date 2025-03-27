import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Table2, type LucideIcon } from "lucide-react";
import type { FileRouteTypes } from "~/routeTree.gen";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import For from "../utils/for";

const SidebarContentItem = () => {
  const { contents } = resources;
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>E-Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <For
            each={contents}
            children={(content, key) => (
              <SidebarMenuItem key={`${key}-${content.title}`}>
                <SidebarMenuButton
                  asChild
                  tooltip={content.title}
                  isActive={location.pathname === content.to}>
                  <Link to={content.to}>
                    <content.icon />
                    <span>{content.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarContentItem;
const resources = {
  contents: [
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Dining Table",
      to: "/dining-table",
      icon: Table2,
    },
  ] satisfies {
    title: string;
    to: FileRouteTypes["to"];
    icon: LucideIcon;
  }[],
};
