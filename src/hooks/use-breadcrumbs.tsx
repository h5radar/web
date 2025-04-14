import { useMemo } from "react";
import { useLocation } from "react-router-dom";

type BreadcrumbItem = {
  title: string;
  link: string;
};

// This allows to add custom title as well
const routeMapping: Record<string, BreadcrumbItem[]> = {
  "/dashboard": [{ title: "Dashboard", link: "/dashboard" }],
  "/dashboard/employee": [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Employee", link: "/dashboard/employee" },
  ],
  "/dashboard/product": [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Product", link: "/dashboard/product" },
  ],
};

export function useBreadcrumbs() {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    // Check if we have a custom mapping for this exact path
    if (routeMapping[location.pathname]) {
      return routeMapping[location.pathname];
    }

    // If no exact match, fall back to generating breadcrumbs from the path
    const segments = location.pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path,
      };
    });
  }, [location.pathname]);
  return breadcrumbs;
}
