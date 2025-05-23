import { NavItem } from "@/types/nav-item";
import {
  Activity,
  Barcode,
  Copyright,
  Cpu, Handshake,
  LayoutDashboard,
  LogIn,
  LucideShoppingBag,
  Ruler, Settings,
  UserPen, Wallet
} from "lucide-react";

/*
 * The data for account sidebar and cmd k bar.
 */
export const accountNavItems: NavItem[] = [
  {
    title: "Account",
    url: "/account",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Profile",
    url: "/profile",
    icon: LayoutDashboard,
    isActive: false,
    shortcut: ["d", "d"],
    items: [],
  },
];

/*
 * The data for billing sidebar and cmd k bar.
 */
export const billingNavItems: NavItem[] = [
  {
    title: "Billing",
    url: "/billing",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: LayoutDashboard,
    isActive: false,
    shortcut: ["d", "d"],
    items: [],
  },
];

/*
 * The data for billing sidebar and cmd k bar.
 */
export const notificationsNavItems: NavItem[] = [
  {
    title: "Notifications",
    url: "/notifications",
    icon: LayoutDashboard,
    isActive: true,
    shortcut: ["d", "d"],
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
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Products",
    url: "/products",
    icon: Barcode,
    shortcut: ["p", "p"],
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
        shortcut: ["m", "m"],
      },
      {
        title: "Platforms",
        url: "/platforms",
        icon: LogIn,
        shortcut: ["l", "l"],
      },
      {
        title: "Teams",
        url: "/teams",
        icon: LogIn,
        shortcut: ["l", "l"],
      },
      {
        title: "Authors",
        url: "/authors",
        icon: LogIn,
        shortcut: ["l", "l"],
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
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Rings",
        url: "/rings",
        icon: LucideShoppingBag,
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Segments",
        url: "/segments",
        icon: LucideShoppingBag,
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Technologies",
        url: "/technologies",
        icon: LucideShoppingBag,
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Technology blips",
        url: "/technology-blips",
        icon: LucideShoppingBag,
        shortcut: ["p", "p"],
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
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Rays",
        url: "/rays",
        icon: Ruler,
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Practices",
        url: "/practices",
        icon: Ruler,
        shortcut: ["p", "p"],
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
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Licenses",
        url: "/licenses",
        icon: Copyright,
        shortcut: ["p", "p"],
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
        shortcut: ["m", "m"],
      },
      {
        title: "Participants",
        url: "/participants",
        icon: Handshake,
        shortcut: ["l", "l"],
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
        shortcut: ["m", "m"],
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
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
    ],
  },
];
