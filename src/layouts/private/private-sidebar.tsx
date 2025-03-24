import SidebarContentItem from "~/components/sidebar/sidebar-content-item";
import SidebarFooterItem from "~/components/sidebar/sidebar-footer-item";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  type SidebarProps,
} from "~/components/ui/sidebar";

const PrivateSidebar = ({ ...props }: SidebarProps) => {
  return (
    <Sidebar {...props}>
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
