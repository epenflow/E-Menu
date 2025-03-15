import { Link } from "@tanstack/react-router";
import type React from "react";
import { buttonVariants } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Block, Heading, Text } from "~/components/ui/typography";
import For from "~/components/utils/for";
import { cn } from "~/lib/utils";
import { FileRouteTypes } from "~/routeTree.gen";
import PrivateContainer from "./private/private-container";

type SettingsLayoutProps = React.FC<React.ComponentProps<"div">>;
const SettingsLayout: SettingsLayoutProps = ({ className, ...props }) => {
  const { asideMenuItems } = resources;

  return (
    <PrivateContainer>
      <div className="px-4 py-6 space-y-6">
        <Block>
          <Heading level={3} className="font-medium">
            Settings
          </Heading>
          <Text>Manage your profile and account settings</Text>
        </Block>

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="max-w-xl lg:w-48">
            <nav className="flex flex-col gap-1 space-x-0">
              <For
                each={asideMenuItems}
                children={(menuItem, key) => (
                  <Link
                    to={menuItem.to}
                    key={`${key}-${menuItem.title}`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "justify-start",
                    )}>
                    {menuItem.title}
                  </Link>
                )}
              />
            </nav>
          </aside>

          <Separator className="md:hidden" />

          <div className={cn("flex-1/2 md:max-w-2xl", className)} {...props} />
        </div>
      </div>
    </PrivateContainer>
  );
};
export default SettingsLayout;

const resources = {
  asideMenuItems: [
    {
      title: "Profile",
      to: "/settings/profile",
    },
    {
      title: "Password",
      to: "/settings/profile",
    },
  ] satisfies { title: string; to: FileRouteTypes["to"] }[],
};
