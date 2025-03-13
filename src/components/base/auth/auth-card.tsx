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
import For from "~/components/utils/for";
import { cn } from "~/lib/utils";
import * as RouteGen from "~/routeTree.gen";

type AuthCardProps = React.ComponentProps<"div"> & {
  breadcrumbs: { title: string; to?: RouteGen.FileRouteTypes["to"] }[];
};
const AuthCard: React.FC<AuthCardProps> = ({
  className,
  breadcrumbs,
  children,
  ...props
}) => {
  return (
    <div className="bg-accent border p-2 my-auto container max-w-md rounded-xl">
      <div
        className={cn("border rounded-xl bg-card p-6", className)}
        {...props}>
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <For each={breadcrumbs}>
              {(breadcrumb, key) => (
                <React.Fragment key={`${key}-${breadcrumb.title}`}>
                  <BreadcrumbItem>
                    {breadcrumb.to ? (
                      <BreadcrumbLink asChild>
                        <Link to={breadcrumb.to}>{breadcrumb.title}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {key !== breadcrumbs.length - 1 ? (
                    <BreadcrumbSeparator />
                  ) : null}
                </React.Fragment>
              )}
            </For>
          </BreadcrumbList>
        </Breadcrumb>
        {children}
      </div>
    </div>
  );
};
export default AuthCard;
