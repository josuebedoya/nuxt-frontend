export interface Translation {
  title: string;
  status: number;
  uri?: string;
  url?: string;
  description?: string;
}

export interface Menu {
  createdAt: string;
  createdBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  /** Locale translations for the menu itself */
  [localeCode: string]: never; // fallback so TS doesn't complain about dynamic locales
  locales: Record<string, Translation>;
  id: number;
  isRoot: number;
  menuItems: MenuItem[];
  primary: number;
  status: number;
  systemName: string;
  title: string;
  updatedAt: string;
  updatedBy: string | null;
}

export interface MenuItem {
  class: string | null;
  createdAt: string;
  createdBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  depth: number | null;
  description: string;
  /** Locale translations for this menu item */
  locales: Record<string, Translation>;
  icon: string | null;
  id: number;
  isRoot: number | null;
  lft: number | null;
  linkType: string;
  menuId: number;
  moduleName: string | null;
  pageId: number | null;
  parentId: number;
  position: number;
  rgt: number | null;
  status: number;
  systemName: string;
  target: string;
  title: string;
  updatedAt: string;
  updatedBy: string | null;
  uri: string;
  url: string;
}
