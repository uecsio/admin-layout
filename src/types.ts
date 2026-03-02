export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  active?: boolean;
  children?: MenuItem[];
}

export interface AdminLayoutProps {
  title?: string;
  menuItems: MenuItem[];
}
