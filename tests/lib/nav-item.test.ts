import { LayoutDashboard } from "lucide-react";
import { describe, expect, it } from "vitest";

import { NavItem } from "@/types/nav-item";

import { isActiveNavItem, isOpenNavItem } from "@/lib/nav-item";

describe("NavItem", () => {
  it("index url false", () => {
    const navItem: NavItem = {
      title: "Practice",
      url: "/practice",
      icon: LayoutDashboard,
      items: [],
    };
    expect(isActiveNavItem("/", navItem)).toBeFalsy();
  });

  it("get active menu item", () => {
    const navItem: NavItem = {
      title: "Practice",
      url: "/practice",
      icon: LayoutDashboard,
      items: [],
    };
    expect(isActiveNavItem("/practice", navItem)).toBeTruthy();
  });

  it("get active menu item for url with filter", () => {
    const navItem: NavItem = {
      title: "Practice",
      url: "/practice",
      icon: LayoutDashboard,
      items: [],
    };
    expect(isActiveNavItem("/practice?name=JS", navItem)).toBeTruthy();
  });

  it("get not active menu item for url with filter", () => {
    const navItem: NavItem = {
      title: "Practice",
      url: "/practice",
      icon: LayoutDashboard,
      items: [],
    };
    expect(isActiveNavItem("/technologies?name=JS", navItem)).toBeFalsy();
  });

  it("get active menu item for url with extra path", () => {
    const navItem: NavItem = {
      title: "Practice",
      url: "/practice",
      icon: LayoutDashboard,
      items: [],
    };
    expect(isActiveNavItem("/practice/new", navItem)).toBeTruthy();
  });

  it("get not active menu item for url with extra path", () => {
    const navItem: NavItem = {
      title: "Practice",
      url: "/practice",
      icon: LayoutDashboard,
      items: [],
    };
    expect(isActiveNavItem("/technologies/new", navItem)).toBeFalsy();
  });

  it("get open menu item", () => {
    const navItem: NavItem = {
      title: "Settings",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Licenses",
          url: "/licenses",
          icon: LayoutDashboard,
          items: [],
        },
        {
          title: "Practice",
          url: "/practice",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isOpenNavItem("/practice", navItem)).toBeTruthy();
  });

  it("get not open menu item", () => {
    const navItem: NavItem = {
      title: "Settings",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Licenses",
          url: "/licenses",
          icon: LayoutDashboard,
          items: [],
        },
        {
          title: "Practice",
          url: "/practice",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isOpenNavItem("/technologies", navItem)).toBeFalsy();
  });

  it("get open menu item for url with extra path", () => {
    const navItem: NavItem = {
      title: "Settings",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Licenses",
          url: "/licenses",
          icon: LayoutDashboard,
          items: [],
        },
        {
          title: "Practice",
          url: "/practice",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isOpenNavItem("/practice/new", navItem)).toBeTruthy();
  });

  it("get not open menu item for url with extra path", () => {
    const navItem: NavItem = {
      title: "Settings",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Licenses",
          url: "/licenses",
          icon: LayoutDashboard,
          items: [],
        },
        {
          title: "Practice",
          url: "/practice",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isOpenNavItem("/technologies/new", navItem)).toBeFalsy();
  });

  it("get open menu item for url with extra path and query", () => {
    const navItem: NavItem = {
      title: "Settings",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Licenses",
          url: "/licenses",
          icon: LayoutDashboard,
          items: [],
        },
        {
          title: "Practice",
          url: "/practice",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isOpenNavItem("/practice/new?name=JS", navItem)).toBeTruthy();
  });

  it("get not open menu item for url with extra path and query", () => {
    const navItem: NavItem = {
      title: "Settings",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Licenses",
          url: "/licenses",
          icon: LayoutDashboard,
          items: [],
        },
        {
          title: "Practice",
          url: "/practice",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isOpenNavItem("/technologies/new?name=JS", navItem)).toBeFalsy();
  });
});
