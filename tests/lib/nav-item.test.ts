import { LayoutDashboard } from "lucide-react";
import { describe, expect, it } from "vitest";

import { NavItem } from "@/types/nav-item";

import isActiveNavItem from "@/lib/nav-item";

describe("NavItem", () => {
  it("index url true", () => {
    const navItem: NavItem = { title: "Radar", url: "/radar", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/radar", navItem)).toBeTruthy();
  });
  it("index url false", () => {
    const navItem: NavItem = { title: "Radar", url: "/radar", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/", navItem)).toBeFalsy();
  });

  it("index url with filter true", () => {
    const navItem: NavItem = { title: "Radar", url: "/radar", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/radar?name=JS", navItem)).toBeTruthy();
  });
  it("index url with filter false", () => {
    const navItem: NavItem = { title: "Radar", url: "/radar", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/technologies?name=JS", navItem)).toBeFalsy();
  });

  it("new url true", () => {
    const navItem: NavItem = { title: "Radar", url: "/radar", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("/radar/new", navItem)).toBeTruthy();
  });
  it("new url false", () => {
    const navItem: NavItem = { title: "Radar", url: "/radar", icon: LayoutDashboard, items: [] };
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
          title: "Radar",
          url: "/radar",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isActiveNavItem("/radar", navItem)).toBeTruthy();
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
          title: "Radar",
          url: "/radar",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isActiveNavItem("/technologies", navItem)).toBeFalsy();
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
          title: "Radar",
          url: "/radar",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isActiveNavItem("/radar/new", navItem)).toBeTruthy();
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
          title: "Radar",
          url: "/radar",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isActiveNavItem("/technologies/new", navItem)).toBeFalsy();
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
          title: "Radar",
          url: "/radar",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isActiveNavItem("/radar/new?name=JS", navItem)).toBeTruthy();
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
          title: "Radar",
          url: "/radar",
          icon: LayoutDashboard,
          items: [],
        },
      ],
    };
    expect(isActiveNavItem("/technologies/new", navItem)).toBeFalsy();
  });
});
