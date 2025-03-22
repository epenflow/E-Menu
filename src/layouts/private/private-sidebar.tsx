import { Link } from "@tanstack/react-router";
import { BookUser } from "lucide-react";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "~/components/ui/sidebar";

const PrivateSidebar = () => {
  const { SidebarFooterItem } = resources;

  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuButton asChild>
            <Link to="/role">
              <BookUser />
              <span>Role</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterItem />
      </SidebarFooter>
    </Sidebar>
  );
};
export default PrivateSidebar;

const resources = {
  SidebarFooterItem: React.lazy(
    () => import("~/components/sidebar/sidebar-footer-item"),
  ),
};
