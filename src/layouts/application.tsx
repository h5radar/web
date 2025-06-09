import { ThemeProvider } from "next-themes";
import { Outlet } from "react-router";

import { Toaster } from "@/ui/sonner.tsx";

import { SearchProvider } from "@/providers/search";

export default function AppLayout() {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="dashboard-theme">
        <SearchProvider>
          <Outlet />
        </SearchProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
