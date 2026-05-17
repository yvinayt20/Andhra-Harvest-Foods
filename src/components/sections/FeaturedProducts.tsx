import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { getFeaturedProducts } from '@/data/products'

export default function FeaturedProducts() {
  const featured = getFeaturedProducts()

  return (
    <section className="py-16 md:py-20 bg-brand-cream" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-2">
              Our Best Sellers
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
              Handpicked favourites from our collection — pure, fresh, and loved by Andhra households.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm hover:gap-3 transition-all shrink-0"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
