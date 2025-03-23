import { Link } from "@tanstack/react-router";
import { BookUser } from "lucide-react";
import SidebarFooterItem from "~/components/sidebar/sidebar-footer-item";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "~/components/ui/sidebar";

const PrivateSidebar = () => {
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
