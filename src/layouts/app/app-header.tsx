import { Link } from "@tanstack/react-router";
import { buttonVariants } from "~/components/ui/button";
import For from "~/components/utils/for";
import { cn } from "~/lib/utils";
import type { FileRouteTypes } from "~/routeTree.gen";

const AppHeader = () => {
  return (
    <header
      className={cn(
        "sticky top-0 w-full z-50 bg-card",
        "border-b border-dashed",
      )}>
      <nav className="container border-x border-dashed h-12 flex items-center justify-between">
        <ul className="flex gap-2.5 items-center">
          <For
            each={
              [
                { title: "E-Menu", id: "#hero" },
                { title: "Features", id: "#feature" },
              ] satisfies { title: string; id: string }[]
            }>
            {(value, key) => (
              <a
                href={value.id}
                key={key}
                className={cn(
                  buttonVariants({ variant: "link", size: "sm" }),
                  "px-0 text-xs",
                  value.title !== "E-Menu" && "hidden md:inline-flex",
                )}>
                {value.title}
              </a>
            )}
          </For>
        </ul>

        <ul className="flex items-center gap-2.5">
          <li className="inline-flex items-center">
            {/* <ThemeButton className="size-8" /> */}
          </li>
          <For
            each={
              [
                { to: "/", title: "Demo" },
                { to: "/sign-in", title: "Sign-in" },
              ] satisfies Array<{
                title: string;
                to: FileRouteTypes["to"];
              }>
            }>
            {(value, key) => (
              <li
                key={key}
                className={cn(
                  buttonVariants({
                    variant: key % 2 === 1 ? "default" : "outline",
                    size: "sm",
                  }),
                  "text-xs font-medium",
                )}>
                <Link to={value.to}>{value.title}</Link>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </header>
  );
};
export default AppHeader;
