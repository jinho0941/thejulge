export interface User {
  id: string
  email: string
  type: 'employee' | 'employer'
  shop: Shop | null
}

export interface UserLink {
  rel: string
  description: string
  method: string
  href: string
  body?: { [key: string]: string }
  query?: { [key: string]: string | number }
}

export interface UserRes {
  item: User
  links: UserLink[]
}

export interface Shop {
  item: {
    id: string
    name: string
    category: string
    address1: string
    address2: string
    description: string
    imageUrl: string
    originalHourlyPay: number
  }
  href: string
}

export interface Notice {
  item: {
    id: string
    hourlyPay: number
    startsAt: string
    workhour: number
    description: string
    closed: boolean
  }
  links: NoticeLink[]
}

interface NoticeLink {
  rel: string
  description: string
  method: string
  href: string
  body?: {
    hourlyPay: string
    startsAt: string
    workhour: string
    description: string
  }
}

interface PaginationLink {
  ref: string
  description: string
  method: string
  href: string
}

export interface NoticesResponse {
  offset: number
  limit: number
  count: number
  hasNext: boolean
  items: Notice[]
  links: PaginationLink[]
}

interface ShopUser {
  item: {
    id: string
    email: string
    type: string
  }
  href: string
}

export interface ShopItem {
  id: string
  name: string
  category: string
  address1: string
  address2: string
  description: string
  imageUrl: string
  originalHourlyPay: number
  user: ShopUser
}

interface ShopLink {
  rel: string
  description: string
  method: string
  href: string
  body?: {
    name?: string
    category?: string
    address1?: string
    address2?: string
    description?: string
    imageUrl?: string
    originalHourlyPay?: number
  }
  query?: {
    offset?: number
    limit?: number
  }
}

export interface ShopRes {
  item: ShopItem
  links: ShopLink[]
}
