'use client'

import { useState, useMemo } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { cn, getCategoryColors } from '@/lib/utils'
import type { Product, Category } from '@/types'

interface ProductsGridProps {
  allProducts: Product[]
  categories: Category[]
  initialCategory?: string
  initialQuery?: string
}

export default function ProductsGrid({
  allProducts,
  categories,
  initialCategory = '',
  initialQuery = '',
}: ProductsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory = !selectedCategory || p.categorySlug === selectedCategory
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.nameTelugu.includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
      return matchesCategory && matchesQuery
    })
  }, [allProducts, selectedCategory, searchQuery])

  return (
    <div>
      {/* Filters bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, Telugu names..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green bg-gray-50"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            {/* Category filter scrollable */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0">
              <SlidersHorizontal size={14} className="text-gray-400 shrink-0" />
              <button
                onClick={() => setSelectedCategory('')}
                className={cn(
                  'shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border',
                  !selectedCategory
                    ? 'bg-brand-green text-white border-brand-green'
                    : 'text-gray-600 border-gray-200 hover:border-gray-300',
                )}
              >
                All ({allProducts.length})
              </button>
              {categories.map((cat) => {
                const count = allProducts.filter((p) => p.categorySlug === cat.slug).length
                const colors = getCategoryColors(cat.slug)
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                    className={cn(
                      'shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5',
                      selectedCategory === cat.slug
                        ? `${colors.accentBg} text-white border-transparent`
                        : `text-gray-600 border-gray-200 hover:border-gray-300`,
                    )}
                  >
                    {cat.icon} {cat.name} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {filtered.length === 0
            ? 'No products found'
            : `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}${selectedCategory ? ` in "${categories.find(c => c.slug === selectedCategory)?.name}"` : ''}`}
        </p>
        {(selectedCategory || searchQuery) && (
          <button
            onClick={() => { setSelectedCategory(''); setSearchQuery('') }}
            className="text-xs text-brand-green font-semibold hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-400 text-sm">
              Try a different search or{' '}
              <button
                onClick={() => { setSelectedCategory(''); setSearchQuery('') }}
                className="text-brand-green font-medium hover:underline"
              >
                clear all filters
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
