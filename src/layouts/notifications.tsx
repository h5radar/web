import { ThemeProvider } from "next-themes";
import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { Toaster } from "@/ui/sonner.tsx";

import AppNavbar from "@/components/app-navbar";
import KBar from "@/components/kbar";
import NotificationsSidebar from "@/components/notifications-sidebar";

export default function BulletinLayout() {
  // Persisting the sidebar state in the cookie.
  // const cookieStore = await cookies();
  const defaultOpen = true;
  // const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="dashboard-theme">
        <KBar>
          <SidebarProvider defaultOpen={defaultOpen}>
            <NotificationsSidebar />
            <SidebarInset>
              <AppNavbar />
              <div className="flex">
                <div className="p-5 w-full">
                  <Outlet />
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </KBar>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
