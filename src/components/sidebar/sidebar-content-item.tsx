import { Link, useLocation } from "@tanstack/react-router";
import {
  Book,
  Calendar,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
  User,
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
      title: "Book",
      to: "/book",
      icon: Book,
    },
    {
      title: "User",
      to: "/role",
      icon: User,
    },
    {
      title: "Inbox",
      to: "/",
      icon: Inbox,
    },
    {
      title: "Calendar",
      to: "/",
      icon: Calendar,
    },
    {
      title: "Search",
      to: "/",
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
