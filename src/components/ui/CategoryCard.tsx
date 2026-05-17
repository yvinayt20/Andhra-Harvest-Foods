import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn, getCategoryColors } from '@/lib/utils'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  productCount: number
  className?: string
}

export default function CategoryCard({ category, productCount, className }: CategoryCardProps) {
  const colors = getCategoryColors(category.slug)

  return (
    <Link href={`/products?category=${category.slug}`} className="group block">
      <article
        className={cn(
          'rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover cursor-pointer',
          `bg-gradient-to-br ${colors.gradient}`,
          colors.borderColor,
          className,
        )}
      >
        {/* Icon */}
        <div className="text-4xl mb-4">{category.icon}</div>

        {/* Names */}
        <h3 className={cn('font-bold text-lg leading-tight', colors.textColor)}>
          {category.name}
        </h3>
        <p className={cn('text-sm font-medium mt-0.5 opacity-80', colors.textColor)}>
          {category.nameTelugu}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">
          {category.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500 font-medium">
            {productCount} product{productCount !== 1 ? 's' : ''}
          </span>
          <span
            className={cn(
              'flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all',
              colors.textColor,
            )}
          >
            Browse
            <ArrowRight size={12} />
          </span>
        </div>
      </article>
    </Link>
  )
}
