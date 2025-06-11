import {
  Activity,
  Barcode,
  Copyright,
  Cpu,
  Handshake,
  LayoutDashboard,
  LogIn,
  LucideShoppingBag,
  Ruler,
  Settings,
  UserPen,
  Wallet,
} from "lucide-react";

import { NavItem } from "@/types/nav-item";

/*
 * The data for account sidebar and cmd k bar.
 */
export const accountNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/account",
    icon: LayoutDashboard,
    isActive: true,
    items: [],
  },
  {
    title: "Profile",
    url: "/profile",
    icon: LayoutDashboard,
    isActive: false,
    items: [],
  },
];

/*
 * The data for billing sidebar and cmd k bar.
 */
export const billingNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/billing",
    icon: LayoutDashboard,
    isActive: true,
    items: [],
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: LayoutDashboard,
    isActive: false,
    items: [],
  },
];

/*
 * The data for billing sidebar and cmd k bar.
 */
export const notificationsNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/notifications",
    icon: LayoutDashboard,
    isActive: true,
    items: [],
  },
];

/*
 * The data for radar sidebar and cmd k bar.
 */
export const radarNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    isActive: true,
    items: [],
  },
  {
    title: "Products",
    url: "/products",
    icon: Barcode,
    isActive: false,
    items: [],
  },
  {
    title: "Contributions",
    url: "#",
    icon: Activity,
    isActive: false,
    items: [
      {
        title: "Git repos",
        url: "/repositories",
        icon: UserPen,
      },
      {
        title: "Platforms",
        url: "/platforms",
        icon: LogIn,
      },
      {
        title: "Teams",
        url: "/teams",
        icon: LogIn,
      },
      {
        title: "Authors",
        url: "/authors",
        icon: LogIn,
      },
    ],
  },
  {
    title: "Technologies",
    url: "#",
    icon: Cpu,
    isActive: false,
    items: [
      {
        title: "Radars",
        url: "/radars",
        icon: LucideShoppingBag,
        isActive: false,
        items: [],
      },
      {
        title: "Rings",
        url: "/rings",
        icon: LucideShoppingBag,
        isActive: false,
        items: [],
      },
      {
        title: "Segments",
        url: "/segments",
        icon: LucideShoppingBag,
        isActive: false,
        items: [],
      },
      {
        title: "Technologies",
        url: "/technologies",
        icon: LucideShoppingBag,
        isActive: false,
        items: [],
      },
      {
        title: "Technology blips",
        url: "/technology-blips",
        icon: LucideShoppingBag,
        isActive: false,
        items: [],
      },
    ],
  },
  {
    title: "Practices",
    url: "#",
    icon: Ruler,
    isActive: false,
    items: [
      {
        title: "Cobwebs",
        url: "/cobwebs",
        icon: Ruler,
        isActive: false,
        items: [],
      },
      {
        title: "Rays",
        url: "/rays",
        icon: Ruler,
        isActive: false,
        items: [],
      },
      {
        title: "Practices",
        url: "/practices",
        icon: Ruler,
        isActive: false,
        items: [],
      },
    ],
  },
  {
    title: "Licenses",
    url: "#",
    icon: Copyright,
    isActive: false,
    items: [
      {
        title: "Pie charts",
        url: "/pies",
        icon: Copyright,
        isActive: false,
        items: [],
      },
      {
        title: "Licenses",
        url: "/licenses",
        icon: Copyright,
        isActive: false,
        items: [],
      },
    ],
  },
  {
    title: "Communications",
    url: "#",
    icon: Handshake,
    isActive: false,
    items: [
      {
        title: "Channels",
        url: "/channels",
        icon: Handshake,
      },
      {
        title: "Participants",
        url: "/participants",
        icon: Handshake,
      },
    ],
  },
  {
    title: "Finances",
    url: "#",
    icon: Wallet,
    isActive: false,
    items: [
      {
        title: "BI systems",
        url: "/bi-systems",
        icon: Wallet,
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    isActive: false,
    items: [
      {
        title: "Adapters",
        url: "/adapters",
        icon: Settings,
      },
    ],
  },
];
