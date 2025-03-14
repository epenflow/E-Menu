import { SidebarTrigger } from "~/components/ui/sidebar";

const PrivateHeader = () => {
  return (
    <header className="border-b p-2">
      <nav className="">
        <SidebarTrigger />
      </nav>
    </header>
  );
};
export default PrivateHeader;
