import { NavItem } from "@/types/nav-item";

/*
 * The data for account sidebar and cmd k bar.
 */
export const accountNavItems: NavItem[] = [
  {
    title: "Account",
    url: "/account",
    icon: "dashboard",
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Profile",
    url: "/profile",
    icon: "dashboard",
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
    icon: "dashboard",
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: "dashboard",
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
    icon: "dashboard",
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
    icon: "dashboard",
    isActive: true,
    shortcut: ["d", "d"],
    items: [],
  },
  {
    title: "Products",
    url: "/products",
    icon: "barcode",
    shortcut: ["p", "p"],
    isActive: false,
    items: [],
  },
  {
    title: "Contributions",
    url: "#",
    icon: "activity",
    isActive: false,
    items: [
      {
        title: "Git repos",
        url: "/repositories",
        icon: "userPen",
        shortcut: ["m", "m"],
      },
      {
        title: "Platforms",
        url: "/platforms",
        icon: "login",
        shortcut: ["l", "l"],
      },
      {
        title: "Teams",
        url: "/teams",
        icon: "login",
        shortcut: ["l", "l"],
      },
      {
        title: "Authors",
        url: "/authors",
        icon: "login",
        shortcut: ["l", "l"],
      },
    ],
  },
  {
    title: "Technologies",
    url: "#",
    icon: "cpu",
    isActive: false,
    items: [
      {
        title: "Radars",
        url: "/radars",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Rings",
        url: "/rings",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Segments",
        url: "/segments",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Technologies",
        url: "/technologies",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Technology blips",
        url: "/technology-blips",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
    ],
  },
  {
    title: "Practices",
    url: "#",
    icon: "ruler",
    isActive: false,
    items: [
      {
        title: "Cobwebs",
        url: "/cobwebs",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Rays",
        url: "/rays",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Practices",
        url: "/practices",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
    ],
  },
  {
    title: "Licenses",
    url: "#",
    icon: "copyright",
    isActive: false,
    items: [
      {
        title: "Pie charts",
        url: "/pies",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Licenses",
        url: "/licenses",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
    ],
  },
  {
    title: "Communications",
    url: "#",
    icon: "handshake",
    isActive: false,
    items: [
      {
        title: "Channels",
        url: "/channels",
        icon: "userPen",
        shortcut: ["m", "m"],
      },
      {
        title: "Participants",
        url: "/participants",
        icon: "login",
        shortcut: ["l", "l"],
      },
    ],
  },
  {
    title: "Finances",
    url: "#",
    icon: "wallet",
    isActive: false,
    items: [
      {
        title: "BI systems",
        url: "/bi-systems",
        icon: "userPen",
        shortcut: ["m", "m"],
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: "settings",
    isActive: false,
    items: [
      {
        title: "Adapters",
        url: "/adapters",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
    ],
  },
];
