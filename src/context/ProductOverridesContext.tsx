'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export type VariantOverride = {
  price: number | null
  stock: number
}

// key: `${productId}__${size}`
type OverrideMap = Record<string, VariantOverride>

type ProductOverridesContextValue = {
  overrides: OverrideMap
  getOverride: (productId: string, size: string) => VariantOverride | null
  isSoldOut: (productId: string, size: string) => boolean
  getPrice: (productId: string, size: string, defaultPrice: number) => number
  reload: () => Promise<void>
}

const ProductOverridesContext = createContext<ProductOverridesContextValue>({
  overrides: {},
  getOverride: () => null,
  isSoldOut: () => false,
  getPrice: (_id, _size, d) => d,
  reload: async () => {},
})

export function ProductOverridesProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const [overrides, setOverrides] = useState<OverrideMap>({})

  const load = useCallback(async () => {
    const { data } = await supabase.from('product_overrides').select('product_id, size, price, stock')
    if (!data) return
    const map: OverrideMap = {}
    for (const row of data) {
      map[`${row.product_id}__${row.size}`] = { price: row.price, stock: row.stock }
    }
    setOverrides(map)
  }, [supabase])

  useEffect(() => { load() }, [load])

  function getOverride(productId: string, size: string): VariantOverride | null {
    return overrides[`${productId}__${size}`] ?? null
  }

  function isSoldOut(productId: string, size: string): boolean {
    const ov = getOverride(productId, size)
    if (!ov) return false
    return ov.stock <= 0
  }

  function getPrice(productId: string, size: string, defaultPrice: number): number {
    const ov = getOverride(productId, size)
    if (ov && ov.price !== null) return ov.price
    return defaultPrice
  }

  return (
    <ProductOverridesContext.Provider value={{ overrides, getOverride, isSoldOut, getPrice, reload: load }}>
      {children}
    </ProductOverridesContext.Provider>
  )
}

export function useProductOverrides() {
  return useContext(ProductOverridesContext)
}
