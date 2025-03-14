import { Link } from "@tanstack/react-router";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const PrivateSidebar = () => {
  const { NavUser, NavHeader } = resources;
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/role">test</Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};
export default PrivateSidebar;

const resources = {
  NavUser: React.lazy(
    () => import("~/components/base/private/sidebar/nav-user"),
  ),
  NavHeader: React.lazy(
    () => import("~/components/base/private/sidebar/nav-header"),
  ),
};
