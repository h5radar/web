import { ThemeProvider } from "next-themes";
import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner.tsx";

import AppNavbar from "@/components/app-navbar";
import KBar from "@/components/kbar";
import RadarSidebar from "@/components/radar-sidebar";

export default function RadarLayout() {
  // Persisting the sidebar state in the cookie.
  // const cookieStore = await cookies();
  const defaultOpen = true;
  // const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="dashboard-theme">
        <KBar>
          <SidebarProvider defaultOpen={defaultOpen}>
            <RadarSidebar />
            <SidebarInset>
              <AppNavbar />
              <div className="flex">
                <div className="p-5 w-full md:max-w-[1140px]">
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
