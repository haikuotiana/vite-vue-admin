export interface MenuItem {
  key: string;
  title: string;
  name: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
}

