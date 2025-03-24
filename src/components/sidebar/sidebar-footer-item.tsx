import { Link } from "@tanstack/react-router";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import React from "react";
import { useAuth } from "~/lib/services/auth";
import { getInitials } from "~/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const SidebarFooterItem = () => {
  const { user, signOut } = useAuth();

  const userInfoToJsx = React.useMemo(
    () => (
      <>
        <Avatar className="rounded-md">
          <AvatarFallback className="rounded-md">
            {getInitials(user?.name)}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight text-foreground">
          {user ? (
            <>
              <span>{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </>
          ) : null}
        </div>
      </>
    ),
    [user],
  );

  const dropdownMenuContentToJsx = React.useMemo(
    () => (
      <>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            {userInfoToJsx}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/settings/profile" className="block w-full">
              <Settings className="mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <LogOut className="mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </>
    ),
    [userInfoToJsx, signOut],
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" tooltip={"Account"}>
              {userInfoToJsx}
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="end"
            side="bottom"
            sideOffset={4}>
            {dropdownMenuContentToJsx}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
export default SidebarFooterItem;
