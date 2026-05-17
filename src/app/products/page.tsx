import type { Metadata } from 'next'
import { products, categories } from '@/data/products'
import ProductsGrid from '@/components/sections/ProductsGrid'

export const metadata: Metadata = {
  title: 'All Products',
  description:
    'Browse our full range of premium rice, dals, spices, flours, and more — all sourced from Andhra Pradesh farms.',
}

interface Props {
  searchParams: { category?: string; q?: string }
}

export default function ProductsPage({ searchParams }: Props) {
  const initialCategory = searchParams.category ?? ''
  const initialQuery = searchParams.q ?? ''

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Page header */}
      <div className="bg-brand-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-2">
            Our Collection
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold">All Products</h1>
          <p className="text-white/60 mt-2 text-sm">
            {products.length} products across {categories.length} categories — 100% natural, directly from farmers.
          </p>
        </div>
      </div>

      <ProductsGrid
        allProducts={products}
        categories={categories}
        initialCategory={initialCategory}
        initialQuery={initialQuery}
      />
    </div>
  )
}
