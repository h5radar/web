import { Barcode, LayoutDashboard } from "lucide-react";

import { GlobalNavItem, NavItem } from "@/types/nav-item";

/*
 * The data for cmd k bar.
 */

const toBoolean = (value: unknown): boolean => {
  return value === "true" || value === true;
};

export const globalNavItems: GlobalNavItem[] = [
  {
    title: "Radar",
    url: "/",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
    showSearch: true,
  },
  {
    title: "Account",
    url: "/account",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
    showSearch: true,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
    showSearch: toBoolean(import.meta.env.VITE_NOTIFICATIONS_ENABLED),
  },
  {
    title: "Billing",
    url: "/billing",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
    showSearch: toBoolean(import.meta.env.VITE_BIILLIG_ENABLED),
  },
];

export const accountSearchItem: NavItem[] = [
  {
    title: "Dashboard",
    url: "/account",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
  },
];

export const billingSearchItem: NavItem[] = [
  {
    title: "Dashboard",
    url: "/billing",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
  },
];

export const notificationSearchItem: NavItem[] = [
  {
    title: "Dashboard",
    url: "/notifications",
    icon: LayoutDashboard,
    items: [],
  },
];

export const radarSearchItem: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    items: [],
  },
  {
    title: "Products",
    url: "/products",
    icon: Barcode,
    items: [],
  },
];
