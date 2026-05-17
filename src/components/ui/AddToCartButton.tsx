'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function AddToCartButton({
  product,
  size = 'md',
  className,
}: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [added, setAdded] = useState(false)

  const inCart = isInCart(product.id, selectedVariant.size)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      productName: product.name,
      productNameTelugu: product.nameTelugu,
      productSlug: product.slug,
      categorySlug: product.categorySlug,
      size: selectedVariant.size,
      price: selectedVariant.price,
      gstRate: product.gstRate,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Variant selector (only show if multiple variants) */}
      {product.variants.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {product.variants.map((v) => (
            <button
              key={v.size}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setSelectedVariant(v)
              }}
              className={cn(
                'text-xs px-2.5 py-1 rounded-lg border font-medium transition-all',
                selectedVariant.size === v.size
                  ? 'border-brand-green bg-brand-green text-white'
                  : 'border-gray-200 text-gray-600 hover:border-brand-green hover:text-brand-green',
              )}
            >
              {v.size}
            </button>
          ))}
        </div>
      )}

      {/* Price + Add button row */}
      <div className="flex items-center gap-2">
        <span className={cn(
          'font-bold text-brand-green',
          size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base',
        )}>
          ₹{selectedVariant.price}
        </span>
        <button
          onClick={handleAdd}
          className={cn(
            'flex items-center gap-1.5 font-semibold rounded-full transition-all flex-1 justify-center',
            size === 'sm'
              ? 'text-xs px-3 py-1.5'
              : size === 'lg'
              ? 'text-sm px-6 py-3'
              : 'text-xs px-4 py-2',
            added
              ? 'bg-green-500 text-white'
              : inCart
              ? 'bg-brand-green/10 border border-brand-green text-brand-green hover:bg-brand-green hover:text-white'
              : 'bg-brand-green text-white hover:bg-brand-green-light',
          )}
        >
          {added ? (
            <>
              <Check size={size === 'lg' ? 16 : 13} />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart size={size === 'lg' ? 16 : 13} />
              {inCart ? 'Add Again' : 'Add to Cart'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
