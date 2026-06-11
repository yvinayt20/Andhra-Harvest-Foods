import Link from 'next/link'
import Image from 'next/image'
import { cn, getCategoryColors } from '@/lib/utils'
import type { Product } from '@/types'
import AddToCartButton from './AddToCartButton'

interface ProductCardProps {
  product: Product
  className?: string
}

const categoryIcons: Record<string, string> = {
  'rice-millets': '🌾',
  'dals-nuts': '🫘',
  'whole-spices': '🌿',
  'powders': '🌶️',
  'flours': '🌻',
  'cooking-essentials': '🫙',
  'beverages': '☕',
  'wellness-range': '💚',
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const colors = getCategoryColors(product.categorySlug)
  const icon = categoryIcons[product.categorySlug] ?? '🌾'

  return (
    <article
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col',
        className,
      )}
    >
      {/* Image area — clickable */}
      <Link href={`/products/${product.slug}`} className="group block relative h-52 overflow-hidden bg-gray-50 shrink-0">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className={cn(
              'w-full h-full flex flex-col items-center justify-center bg-gradient-to-br',
              colors.placeholderFrom,
              colors.placeholderTo,
            )}
          >
            <span className="text-5xl mb-2">{icon}</span>
            <span className={cn('text-xs font-semibold uppercase tracking-widest', colors.textColor)}>
              Andhra Harvest
            </span>
          </div>
        )}

        {product.isFeatured && (
          <div className="absolute top-3 left-3">
            <span className="bg-brand-gold text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Popular
            </span>
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-3 right-3">
            <span className="bg-purple-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              New
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category badge */}
        <span
          className={cn(
            'inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 w-fit',
            colors.badgeBg,
          )}
        >
          {product.categorySlug.replace(/-/g, ' ')}
        </span>

        {/* Names — clickable */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-gray-900 text-base hover:text-brand-green transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-brand-gold text-sm font-medium mt-0.5">{product.nameTelugu}</p>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Add to cart */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </article>
  )
}
