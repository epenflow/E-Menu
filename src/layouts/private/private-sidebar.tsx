import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "~/components/ui/sidebar";

const PrivateSidebar = () => {
  const { NavUser, NavHeader } = resources;
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent />
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
