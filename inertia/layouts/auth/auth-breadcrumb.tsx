import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import For from '~/components/utility/for'
import type { BreadcrumbItem as TBreadcrumbItem } from '~/types'

type AuthBreadcrumbProps = {
  breadcrumbs: TBreadcrumbItem[]
}
const AuthBreadcrumb: React.FC<AuthBreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <Breadcrumb className="mb-6">
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
  )
}
export default AuthBreadcrumb
