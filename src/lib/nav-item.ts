import { NavItem } from "@/types/nav-item";

/**
 * Check is sidebar menu item is active or not.
 * This function has been implemented in different way:
 * return (
 *   href === item.url ||
 *   href.split("?")[0] === item.url ||
 *   href.split("?")[0].split("/")[1] === item.url ||
 *   (href.split("/")[1] !== "" && href.split("/")[1] === item?.url?.split("/")[1])
 * );
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
 * This function has been implemented in different way:
 * return href.split("/")[1] !== ""
 *   && !!item?.items?.filter((i) =&gt i.url.split("/")[1] === href.split("/")[1]).length;
 *
 * @param href - current URL
 * @param item - current nav item at sidebar. It has a child items.
 */
export function isOpenNavItem(href: string, item: NavItem) {
  return !!item?.items?.filter((i) => href.startsWith(i.url)).length;
}
