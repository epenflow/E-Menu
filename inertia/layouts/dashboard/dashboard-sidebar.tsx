import { Link } from '@inertiajs/react'
import { ChevronsUpDown, LogOut, Settings, Utensils } from 'lucide-react'
import React from 'react'
import UserInfo from '~/components/base/user-info'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui/sidebar'
import { useIsMobile } from '~/hooks/use-mobile'
import { signOut } from '~/lib/utils'

const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-foreground text-sidebar flex aspect-square size-8 items-center justify-center rounded-md">
                  <Utensils className="size-5" />
                </div>
                <div className="ml-1 grid flex-1 text-left text-sm">
                  <span className="mb-0.5 truncate leading-none font-semibold">E-Menu</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

const NavUser = () => {
  const isMobile = useIsMobile()
  const { state } = useSidebar()

  const showUserMenuContent = React.useMemo(
    () => (
      <>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserInfo showEmail />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/profile" className="block w-full">
              <Settings className="mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2" />
          Log out
        </DropdownMenuItem>
      </>
    ),
    []
  )

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <UserInfo />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="end"
            side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
          >
            {showUserMenuContent}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
export default DashboardSidebar
