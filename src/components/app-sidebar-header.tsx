import { GalleryVerticalEnd } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";
import { APP_NAME } from "@/constants";

const company = {
  name: `${APP_NAME}`,
  logo: GalleryVerticalEnd,
  plan: "Free plan",
};

const AppSidebarHeader = () => {
  return (
    <>
      <SidebarHeader>
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <company.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{company.name}</span>
            <span className="truncate text-xs">{company.plan}</span>
          </div>
        </div>
      </SidebarHeader>
    </>
  );
};

export default AppSidebarHeader;
