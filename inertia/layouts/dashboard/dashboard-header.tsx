import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { SidebarTrigger } from '~/components/ui/sidebar'
import For from '~/components/utility/for'
import { cn } from '~/lib/utils'
import type { BreadcrumbItem as TBreadcrumbItem } from '~/types'
import ThemeButton from '../app/theme-button'

type DashboardHeaderProps = {
  breadcrumbs: TBreadcrumbItem[]
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ breadcrumbs }) => {
  const showBreadcrumbs = React.useMemo(
    () => (
      <>
        <Breadcrumb>
          <BreadcrumbList>
            <For each={breadcrumbs}>
              {(breadcrumb, key) => (
                <React.Fragment key={`${key}-${breadcrumb.title}`}>
                  <BreadcrumbItem>
                    {breadcrumb.href ? (
                      <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.title}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {key !== breadcrumbs.length - 1 ? <BreadcrumbSeparator /> : null}
                </React.Fragment>
              )}
            </For>
          </BreadcrumbList>
        </Breadcrumb>
      </>
    ),
    [breadcrumbs]
  )

  return (
    <header className={cn('bg-card border-b top-0 sticky z-50')}>
      <nav className="flex h-14 items-center px-4 gap-4 justify-between">
        <section className="flex items-center gap-4">
          <SidebarTrigger />
          {showBreadcrumbs}
        </section>
        <ThemeButton />
      </nav>
    </header>
  )
}
export default DashboardHeader
