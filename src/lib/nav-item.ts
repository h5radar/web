import { NavItem } from "@/types/nav-item";

/**
 * Check is sidebar menu item is active or not.
 *
 * @param href - current URL
 * @param item - current nav item at sidebar
 */
export function isActiveNavItem(href: string, item: NavItem) {
  if (item.url === "/") {
    return href == item.url;
  } else {
    return href.startsWith(item.url);
  }
}

/**
 * Check is sidebar menu should be open or not
 *
 * @param href - current URL
 * @param item - current nav item at sidebar. It item has a child items.
 */
export function isOpenNavItem(href: string, item: NavItem) {
  return !!item?.items?.filter((i) => href.startsWith(i.url)).length;
}
