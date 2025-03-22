import { Link } from "@tanstack/react-router";
import React from "react";
import useBreadcrumbNavigation from "~/hooks/breadcrumb-navigation";
import { cn } from "~/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import For from "./utils/for";

type BreadcrumbNavigationProps = React.ComponentProps<"nav">;
const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  ...props
}) => {
  const breadcrumbs = useBreadcrumbNavigation();

  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        <For
          each={breadcrumbs}
          children={(breadcrumb, key) => (
            <React.Fragment key={`${key}-${breadcrumb.title}`}>
              <BreadcrumbItem>
                {breadcrumb.to ? (
                  <BreadcrumbLink asChild>
                    <Link to={breadcrumb.to}>{breadcrumb.title}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage
                    className={cn({
                      "text-foreground": breadcrumb.isPage,
                      "text-muted-foreground": !breadcrumb.isPage,
                    })}>
                    {breadcrumb.title}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {breadcrumbs.length - 1 !== key ? <BreadcrumbSeparator /> : null}
            </React.Fragment>
          )}
        />
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default BreadcrumbNavigation;
