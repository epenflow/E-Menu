import { Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import PrivateHeader from "./private/private-header";
import PrivateSidebar from "./private/private-sidebar";

const PrivateLayout = () => {
  return (
    <SidebarProvider variant="inset">
      <PrivateSidebar collapsible="icon" />
      <SidebarInset className="overflow-hidden">
        <PrivateHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};
export default PrivateLayout;
