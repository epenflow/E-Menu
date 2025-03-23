import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
  type LucideIcon,
} from "lucide-react";
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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>E-Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <For
            each={contents}
            children={(content, key) => (
              <SidebarMenuItem key={`${key}-${content.title}`}>
                <SidebarMenuButton asChild>
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
      title: "Inbox",
      to: "/dashboard",
      icon: Inbox,
    },
    {
      title: "Calendar",
      to: "/dashboard",
      icon: Calendar,
    },
    {
      title: "Search",
      to: "/dashboard",
      icon: Search,
    },
    {
      title: "Settings",
      to: "/settings/profile",
      icon: Settings,
    },
  ] satisfies {
    title: string;
    to: FileRouteTypes["to"];
    icon: LucideIcon;
  }[],
};
