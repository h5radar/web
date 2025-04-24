import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { UserDropdown } from "@/components/user-dropdown.tsx";
import { Breadcrumbs } from "@/components/breadcrumbs";
import SearchInput from "@/components/search-input";
import ThemeToggler from "@/components/theme-toggler";
import { TenantSwitcher } from "@/components/tenant-switcher";

const AppNavbar = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-2 px-4">
        <div className="hidden md:flex">
          <SearchInput />
        </div>
        <TenantSwitcher />
        <UserDropdown />
        <ThemeToggler />
      </div>
    </header>
  );
};

export default AppNavbar;
