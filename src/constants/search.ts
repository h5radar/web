import { Barcode, LayoutDashboard } from "lucide-react";

import { NavItem } from "@/types/nav-item";

/*
 * The data for cmd k bar.
 */
export const globalNavItems: NavItem[] = [
  {
    title: "Radar",
    url: "/",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Account",
    url: "/account",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Billing",
    url: "/billing",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
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
