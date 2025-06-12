import { Barcode, LayoutDashboard } from "lucide-react";

import { NavItem } from "@/types/nav-item";

import { toBoolean } from "@/lib/converters";

/*
 * The global data for cmd k bar.
 */
export const globalNavItems: NavItem[] = [
  {
    title: "Radar",
    url: "/",
    show: true,
    icon: LayoutDashboard,
    items: [],
  },
  {
    title: "Account",
    url: "/account",
    show: true,
    icon: LayoutDashboard,
    items: [],
  },
  {
    title: "Notifications",
    url: "/notifications",
    show: toBoolean(import.meta.env.VITE_NOTIFICATIONS_ENABLED),
    icon: LayoutDashboard,
    items: [],
  },
  {
    title: "Billing",
    url: "/billing",
    show: toBoolean(import.meta.env.VITE_BIILLIG_ENABLED),
    icon: LayoutDashboard,
    items: [],
  },
];

/*
 * The layout specific data for cmd k bar.
 */
export const accountSearchItem: NavItem[] = [
  {
    title: "Dashboard",
    url: "/account",
    icon: LayoutDashboard,
    items: [],
  },
];

export const billingSearchItem: NavItem[] = [
  {
    title: "Dashboard",
    url: "/billing",
    icon: LayoutDashboard,
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
