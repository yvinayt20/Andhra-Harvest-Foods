import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import CategoryCard from '@/components/ui/CategoryCard'
import { categories, getCategoryProductCount } from '@/data/products'

export default function CategorySection() {
  return (
    <section className="py-16 md:py-20 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-2">
            Browse by Category
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Everything Your Kitchen Needs
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            From staple grains to aromatic spices — all sourced from Andhra Pradesh and packed with care.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              productCount={getCategoryProductCount(category.slug)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-brand-green-light transition-colors"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
