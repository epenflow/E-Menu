import Breadcrumbs from "~/components/breadcrumbs";
import { SidebarTrigger } from "~/components/ui/sidebar";

const PrivateHeader = () => {
  return (
    <header className="border-b bg-card shrink-0">
      <nav className="flex h-14 items-center px-4 gap-4 justify-between">
        <div className="inline-flex items-center gap-2">
          <SidebarTrigger />
          <Breadcrumbs />
        </div>
      </nav>
    </header>
  );
};
export default PrivateHeader;
