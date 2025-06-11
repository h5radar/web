import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, RadarIcon } from "lucide-react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

import { Avatar, AvatarFallback } from "@/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/ui/sidebar";

import { BILLING_ENABLED, NOTIFICATIONS_ENABLED } from "@/constants/application";

const AppSidebarFooter = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {auth?.user?.profile.name?.[0]?.toUpperCase() || "CN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{auth?.user?.profile.name || ""}</span>
                    <span className="truncate text-xs">{auth?.user?.profile.email || ""}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {auth?.user?.profile.name?.[0].toUpperCase() || "CN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{auth?.user?.profile.name || ""}</span>
                      <span className="truncate text-xs"> {auth?.user?.profile.email || ""}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    <RadarIcon />
                    Radar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  {NOTIFICATIONS_ENABLED === "true" && (
                    <DropdownMenuItem onClick={() => navigate("/notifications")}>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  )}
                  {BILLING_ENABLED === "true" && (
                    <DropdownMenuItem onClick={() => navigate("/billing")}>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => auth.signoutRedirect()}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
};

export default AppSidebarFooter;
