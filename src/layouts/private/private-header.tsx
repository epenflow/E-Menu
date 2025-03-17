import { Link } from "@tanstack/react-router";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { SidebarTrigger } from "~/components/ui/sidebar";
import For from "~/components/utils/for";
import useBreadcrumbs from "~/hooks/breadcrumbs";
import { cn } from "~/lib/utils";

const PrivateHeader = () => {
  const breadcrumbs = useBreadcrumbs();
  const showBreadcrumbs = React.useMemo(
    () =>
      breadcrumbs.length > 0 ? (
        <Breadcrumb>
          <BreadcrumbList>
            <For
              each={breadcrumbs}
              children={(breadcrumb, key) => (
                <React.Fragment key={`${key}-${breadcrumb.title}`}>
                  {breadcrumb.to ? (
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={breadcrumb.to}>{breadcrumb.title}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage
                        className={cn({
                          "text-foreground": breadcrumb.isPage,
                          "text-muted-foreground": !breadcrumb.isPage,
                        })}>
                        {breadcrumb.title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}

                  {breadcrumbs.length - 1 !== key ? (
                    <BreadcrumbSeparator />
                  ) : null}
                </React.Fragment>
              )}
            />
          </BreadcrumbList>
        </Breadcrumb>
      ) : null,
    [breadcrumbs],
  );

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <nav className="flex h-14 items-center px-4 gap-4 justify-between">
        <div className="inline-flex items-center gap-2">
          <SidebarTrigger />
          {showBreadcrumbs}
        </div>
      </nav>
    </header>
  );
};
export default PrivateHeader;
