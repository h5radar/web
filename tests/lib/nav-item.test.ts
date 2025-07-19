import { LayoutDashboard } from "lucide-react";
import { describe, expect, it } from "vitest";

import { NavItem } from "@/types/nav-item";

import { isActiveNavItem, isOpenNavItem } from "@/lib/nav-item";

describe("NavItem", () => {
  it("index url false", () => {
    const navItem: NavItem = { title: "Practice", url: "/practice", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/", navItem)).toBeFalsy();
  });

  it("index url true", () => {
    const navItem: NavItem = { title: "Practice", url: "/practice", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/practice", navItem)).toBeTruthy();
  });

  it("index url with filter true", () => {
    const navItem: NavItem = { title: "Practice", url: "/practice", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/practice?name=JS", navItem)).toBeTruthy();
  });

  it("index url with filter false", () => {
    const navItem: NavItem = { title: "Practice", url: "/practice", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/technologies?name=JS", navItem)).toBeFalsy();
  });

  it("new url true", () => {
    const navItem: NavItem = { title: "Practice", url: "/practice", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/practice/new", navItem)).toBeTruthy();
  });

  it("new url false", () => {
    const navItem: NavItem = { title: "Practice", url: "/practice", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/technologies/new", navItem)).toBeFalsy();
  });

  it("entry url true", () => {
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

  it("entry url false", () => {
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

  it("entry new url true", () => {
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

  it("entry new url false", () => {
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

  it("entry new query url true", () => {
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
  it("entry new query url false", () => {
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
