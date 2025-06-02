/**
 * NavItem is a type for left sidebar
 *
 */
export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: React.ElementType;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}
