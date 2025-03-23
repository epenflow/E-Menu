import SidebarContentItem from "~/components/sidebar/sidebar-content-item";
import SidebarFooterItem from "~/components/sidebar/sidebar-footer-item";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "~/components/ui/sidebar";

const PrivateSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarContentItem />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterItem />
      </SidebarFooter>
    </Sidebar>
  );
};
export default PrivateSidebar;
