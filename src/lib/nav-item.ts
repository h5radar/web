import { NavItem } from "@/types/nav-item";

/**
 * Check is sidebar menu item is active or not.
 * TODO: put logic here
 *
 * @param href - current URL
 * @param item - current nav item at sidebar
 * @returns true if sidebar menu is active, otherwise false
 */
export default function isActiveNavItem(href: string, item: NavItem) {
  /*
  // Pseudocode
  if(href == "/"){
    return (href == item.url);
  } else {
    if( level == 0){
      return (href.startsWith(item.url));
    } else {
      // Erase first path of the url
      href1: String = href.erase(0, href.find("\"));
      return (href1.startsWith(item.url));
    }
  }
   */

  return (
    href === item.url ||
    href.split("?")[0] === item.url ||
    (href.split("/")[1] !== "" && href.split("/")[1] === item?.url?.split("/")[1]) ||
    (href.split("/")[1] !== "" && !!item?.items?.filter((i) => i.url.split("/")[1] === href.split("/")[1]).length)
  );
}
