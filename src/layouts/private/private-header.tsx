import { SidebarTrigger } from "~/components/ui/sidebar";

const PrivateHeader = () => {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <nav className="flex h-14 items-center px-4 gap-4 justify-between">
        <SidebarTrigger />
      </nav>
    </header>
  );
};
export default PrivateHeader;
