/**
 * NavItem is a type for left sidebar and cmdk
 *
 */
export interface NavItem {
  title: string;
  url: string;
  show?: boolean;
  icon?: React.ElementType;
  items?: NavItem[];
}
