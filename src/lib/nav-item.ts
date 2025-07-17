import { NavItem } from "@/types/nav-item";

/**
 * Check is sidebar menu item is active or not.
 * TODO: put logic here
 *
 * @param href - current URL
 * @param item - current nav item at sidebar
 * @param manNav - ? TODO
 * @returns true if sidebar menu is active, otherwise false
 */
export default function isActiveNavItem(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url ||
    href.split("?")[0] === item.url ||
    !!item?.items?.filter((i) => i.url === href).length ||
    (href.split("/")[1] !== "" && href.split("/")[1] === item?.url?.split("/")[1]) ||
    (mainNav &&
      href.split("/")[1] !== "" &&
      !!item?.items?.filter((i) => i.url.split("/")[1] === href.split("/")[1]).length)
  );
}
