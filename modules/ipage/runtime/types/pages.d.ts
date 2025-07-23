export interface PageData {
  id: number
  title: string | null
  slug: string | null
  body: string | null
  metaTitle: string | null
  metaDescription: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImage: string | null
  ogType: string | null
  createdAt: string
  updatedAt: string
  createdBy: number
  updatedBy: number
  internal: number
  isHome: boolean | null
  options: Record<string, never> // or specify the keys if known
  systemName: string
  template: string
  type: string
  status: boolean | null
  recordType: string

  // localized content
  es?: PageLocale
  [locale: string]: PageLocale | unknown
}

export interface PageLocale {
  title: string
  slug: string
  status: boolean
  body: string
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogType: string
}
