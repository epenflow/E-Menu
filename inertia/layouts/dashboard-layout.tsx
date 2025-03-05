import type React from 'react'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import type { BreadcrumbItem } from '~/types'
import DashboardHeader from './dashboard/dashboard-header'
import DashboardSidebar from './dashboard/dashboard-sidebar'
import RootLayout from './root-layout'

type DashboardLayoutProps = React.PropsWithChildren & {
  breadcrumbs: BreadcrumbItem[]
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, breadcrumbs }) => {
  return (
    <RootLayout>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <DashboardHeader breadcrumbs={breadcrumbs} />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </RootLayout>
  )
}
export default DashboardLayout
