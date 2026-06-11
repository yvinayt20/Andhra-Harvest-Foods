'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, LogOut, Save, Loader2, ChevronLeft, Search, Package } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { products } from '@/data/products'
import type { Product } from '@/types'

type VariantRow = {
  productId: string
  size: string
  price: string
  stock: string
  saving: boolean
  saved: boolean
}

export default function AdminProductsPage() {
  const { user, loading, signOut, isAdmin } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [search, setSearch] = useState('')
  const [rows, setRows] = useState<VariantRow[]>([])
  const [initialised, setInitialised] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login?redirect=/admin/products')
    if (!loading && user && !isAdmin) router.push('/')
  }, [user, loading, isAdmin, router])

  const loadOverrides = useCallback(async () => {
    const { data } = await supabase
      .from('product_overrides')
      .select('product_id, size, price, stock')

    const overrideMap: Record<string, { price: number | null; stock: number }> = {}
    for (const row of data ?? []) {
      overrideMap[`${row.product_id}__${row.size}`] = { price: row.price, stock: row.stock }
    }

    const built: VariantRow[] = []
    for (const product of products) {
      for (const variant of product.variants) {
        const ov = overrideMap[`${product.id}__${variant.size}`]
        built.push({
          productId: product.id,
          size: variant.size,
          price: ov?.price != null ? String(ov.price) : String(variant.price),
          stock: ov ? String(ov.stock) : '',
          saving: false,
          saved: false,
        })
      }
    }
    setRows(built)
    setInitialised(true)
  }, [supabase])

  useEffect(() => { if (isAdmin) loadOverrides() }, [isAdmin, loadOverrides])

  function updateRow(productId: string, size: string, field: 'price' | 'stock', value: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.productId === productId && r.size === size
          ? { ...r, [field]: value, saved: false }
          : r,
      ),
    )
  }

  async function saveRow(productId: string, size: string) {
    const row = rows.find((r) => r.productId === productId && r.size === size)
    if (!row) return

    const price = parseInt(row.price)
    const stock = row.stock === '' ? null : parseInt(row.stock)

    if (isNaN(price) || price < 0) return

    setRows((prev) =>
      prev.map((r) =>
        r.productId === productId && r.size === size ? { ...r, saving: true } : r,
      ),
    )

    await supabase.from('product_overrides').upsert(
      { product_id: productId, size, price, stock: stock ?? 0 },
      { onConflict: 'product_id,size' },
    )

    setRows((prev) =>
      prev.map((r) =>
        r.productId === productId && r.size === size
          ? { ...r, saving: false, saved: true }
          : r,
      ),
    )
    setTimeout(() => {
      setRows((prev) =>
        prev.map((r) =>
          r.productId === productId && r.size === size ? { ...r, saved: false } : r,
        ),
      )
    }, 2000)
  }

  async function handleSignOut() {
    await signOut()
    router.push('/')
  }

  const filteredProducts = products.filter(
    (p) =>
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.categorySlug.includes(search.toLowerCase()),
  )

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <div className="bg-brand-green text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} />
          <span className="font-bold text-lg">Admin Panel</span>
          <span className="text-white/50 hidden sm:inline">·</span>
          <span className="text-white/70 text-sm hidden sm:inline">Products</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors">
            <ChevronLeft size={16} /> Dashboard
          </Link>
          <button onClick={handleSignOut} className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Manage Products</h1>
            <p className="text-sm text-gray-400 mt-0.5">Set prices and stock counts. Stock of 0 shows &ldquo;Sold Out&rdquo; to customers.</p>
          </div>
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green w-56"
            />
          </div>
        </div>

        {!initialised ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-brand-green" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductSection
                key={product.id}
                product={product}
                rows={rows.filter((r) => r.productId === product.id)}
                onUpdate={updateRow}
                onSave={saveRow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProductSection({
  product,
  rows,
  onUpdate,
  onSave,
}: {
  product: Product
  rows: VariantRow[]
  onUpdate: (productId: string, size: string, field: 'price' | 'stock', value: string) => void
  onSave: (productId: string, size: string) => void
}) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Product header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 bg-gray-50/60">
        <Package size={16} className="text-brand-green shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-gray-800 text-sm">{product.name}</span>
          <span className="ml-2 text-xs text-gray-400">{product.nameTelugu}</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold bg-gray-100 px-2 py-0.5 rounded-full">
          {product.categorySlug.replace(/-/g, ' ')}
        </span>
      </div>

      {/* Variant rows */}
      <div className="divide-y divide-gray-50">
        {rows.map((row) => {
          const defaultVariant = product.variants.find((v) => v.size === row.size)
          return (
            <div key={row.size} className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-3 px-5 py-3">
              {/* Size */}
              <span className="text-xs font-bold text-gray-500 w-16 shrink-0">{row.size}</span>

              {/* Price */}
              <label className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Price (₹)</span>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input
                    type="number"
                    min={0}
                    value={row.price}
                    onChange={(e) => onUpdate(product.id, row.size, 'price', e.target.value)}
                    placeholder={String(defaultVariant?.price ?? '')}
                    className="w-full pl-6 pr-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
                  />
                </div>
              </label>

              {/* Stock */}
              <label className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Stock (units)</span>
                <input
                  type="number"
                  min={0}
                  value={row.stock}
                  onChange={(e) => onUpdate(product.id, row.size, 'stock', e.target.value)}
                  placeholder="0 = sold out"
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
                />
              </label>

              {/* Save */}
              <button
                onClick={() => onSave(product.id, row.size)}
                disabled={row.saving}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                  row.saved
                    ? 'bg-green-50 text-green-600'
                    : 'bg-brand-green text-white hover:bg-brand-green-light'
                } disabled:opacity-60`}
              >
                {row.saving ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Save size={12} />
                )}
                {row.saved ? 'Saved!' : 'Save'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
