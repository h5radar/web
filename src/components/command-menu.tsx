import { IconArrowRight, IconChevronRight, IconDeviceLaptop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React from "react";
import { useNavigate } from "react-router";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/ui/command";
import { ScrollArea } from "@/ui/scroll-area";

import { globalNavItems } from "@/constants/sidebar";

import { NavItem } from "@/types/nav-item";

import { useSearch } from "@/hooks/useSearch";

interface CommandMenuProps {
  navItemList: NavItem[];
}
export function CommandMenu({ navItemList }: CommandMenuProps) {
  const { setTheme } = useTheme();
  const { open, setOpen } = useSearch();
  const navigate = useNavigate();

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <ScrollArea type="hover" className="h-72 pr-1">
          <CommandEmpty>No results found.</CommandEmpty>
          {navItemList.map((group, keyGroup) => {
            if (group.url !== "#") {
              return (
                <CommandGroup key={group.title} heading={group.title}>
                  <CommandItem
                    key={`${group.url}-${keyGroup}`}
                    value={group.title}
                    onSelect={() => {
                      runCommand(() => navigate(group.url));
                    }}
                  >
                    <div className="mr-2 flex h-4 w-4 items-center justify-center">
                      <IconArrowRight className="text-muted-foreground/80 size-2" />
                    </div>

                    {group.title}
                  </CommandItem>
                </CommandGroup>
              );
            }
            return (
              <CommandGroup key={group.title} heading={group.title}>
                {group.items &&
                  group.items.map((navItem, keyNavItem) => {
                    return (
                      <CommandItem
                        key={`${navItem.url}-${keyNavItem}`}
                        value={navItem.title}
                        onSelect={() => {
                          runCommand(() => navigate(navItem.url));
                        }}
                      >
                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                          <IconArrowRight className="text-muted-foreground/80 size-2" />
                        </div>
                        {group.title} <IconChevronRight /> {navItem.title}
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            );
          })}
          <CommandSeparator />
          {globalNavItems.map((group, keyGroup) => (
            <CommandGroup key={group.title}>
              <CommandItem
                key={`${group.url}-${keyGroup}`}
                value={group.title}
                onSelect={() => {
                  runCommand(() => navigate(group.url));
                }}
              >
                <div className="mr-2 flex h-4 w-4 items-center justify-center">
                  <IconArrowRight className="text-muted-foreground/80 size-2" />
                </div>
                {group.title}
              </CommandItem>
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <IconSun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <IconMoon className="scale-90" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <IconDeviceLaptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
