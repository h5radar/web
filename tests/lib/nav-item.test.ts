import { LayoutDashboard } from "lucide-react";
import { describe, expect, it } from "vitest";

import { NavItem } from "@/types/nav-item";

import isActiveNavItem from "@/lib/nav-item";

describe("NavItem", () => {
  it("index url", () => {
    const navItem: NavItem = { title: "Radar", url: "/radar", icon: LayoutDashboard, items: [] };
    // expect(isActiveNavItem("radar", navItem)).toBeTruthy();
    expect(isActiveNavItem("radar", navItem)).toBeFalsy();
  });

  it("index url with filter", () => {
    const navItem: NavItem = { title: "Radar", url: "/radar", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("radar", navItem)).toBeFalsy();
  });

  it("new url", () => {
    const navItem: NavItem = { title: "Radar", url: "/radar", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("radar", navItem)).toBeFalsy();
  });

  it("edit url", () => {
    const navItem: NavItem = { title: "Radar", url: "/radar", icon: LayoutDashboard, items: [] };
    expect(isActiveNavItem("radar", navItem)).toBeFalsy();
  });
});
