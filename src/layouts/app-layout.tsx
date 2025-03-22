import { Outlet } from "@tanstack/react-router";
import AppHeader from "./app/app-header";

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
export default AppLayout;
