/**
 * NavItem is a type for left sidebar and cmdk
 *
 */
export interface NavItem {
  title: string;
  url: string;
  icon?: React.ElementType;
  items?: NavItem[];
}

export interface GlobalNavItem extends NavItem {
  showSearch: boolean;
}
