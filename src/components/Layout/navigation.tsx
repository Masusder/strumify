"use client"

import * as React from "react";

import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { MenuSquare } from "lucide-react";
import styles from './navigation.module.css';

export function NavigationMenuCustom({ lang }: { lang: string }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="hidden md:inline">Get started</span>
            <span className="md:hidden"><MenuSquare /></span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[200px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className={styles.bgCustomGradient + " flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"}
                    href={`/${lang}`}
                  >
                    <div className="mb-2 mt-4 text-lg font-bold">
                      Strumify
                    </div>
                    <p className="text-sm leading-tight text-background">
                      Your ultimate guitar companion for creating and sharing tabs..
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href={`/${lang}/tuner`} title="Guitar Tuner">
                A handy tool for tuning your instrument with precision.
              </ListItem>
              <ListItem href={`/${lang}/installation`} title="Installation">
                Install the app and start sharing your own music.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
