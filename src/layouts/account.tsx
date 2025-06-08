import Cookies from "js-cookie";
import { ThemeProvider } from "next-themes";
import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { Toaster } from "@/ui/sonner.tsx";

import AccountSidebar from "@/components/account-sidebar";
import AppNavbar from "@/components/app-navbar";

import { SearchProvider } from "@/providers/search-provider";

export default function AccountLayout() {
  // Persisting the sidebar state in the cookie.
  const defaultOpen = Cookies.get("sidebar_state") !== "false";

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="dashboard-theme">
        <SearchProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AccountSidebar />
            <SidebarInset>
              <AppNavbar />
              <div className="flex">
                <div className="p-5 w-full md:max-w-[1440px]">
                  <Outlet />
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SearchProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
