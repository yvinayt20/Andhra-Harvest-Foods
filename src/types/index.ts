export type Variant = {
  size: string
  price: number
}

export type Product = {
  id: string
  name: string
  nameTelugu: string
  slug: string
  categorySlug: string
  description: string
  longDescription?: string
  image: string | null
  variants: Variant[]
  features: string[]
  tags: string[]
  isFeatured?: boolean
  isNew?: boolean
  gstRate: 0 | 5 | 12
}

export type Category = {
  id: string
  name: string
  nameTelugu: string
  slug: string
  description: string
  icon: string
}

export type CategoryColors = {
  gradient: string
  textColor: string
  borderColor: string
  badgeBg: string
  placeholderFrom: string
  placeholderTo: string
  accentBg: string
}

export type CartItem = {
  productId: string
  productName: string
  productNameTelugu: string
  productSlug: string
  categorySlug: string
  size: string
  price: number
  gstRate: number
  quantity: number
}

export type OrderDetails = {
  name: string
  phone: string
  address: string
  city: string
  pincode: string
  notes: string
}
