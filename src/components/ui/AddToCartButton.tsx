'use client'

import { useState } from 'react'
import { ShoppingCart, Check, Ban } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useProductOverrides } from '@/context/ProductOverridesContext'
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
  const { isSoldOut, getPrice } = useProductOverrides()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [added, setAdded] = useState(false)

  const soldOut = isSoldOut(product.id, selectedVariant.size)
  const price = getPrice(product.id, selectedVariant.size, selectedVariant.price)
  const inCart = isInCart(product.id, selectedVariant.size)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (soldOut) return
    addItem({
      productId: product.id,
      productName: product.name,
      productNameTelugu: product.nameTelugu,
      productSlug: product.slug,
      categorySlug: product.categorySlug,
      size: selectedVariant.size,
      price,
      gstRate: product.gstRate,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Variant selector */}
      {product.variants.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {product.variants.map((v) => {
            const variantSoldOut = isSoldOut(product.id, v.size)
            return (
              <button
                key={v.size}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedVariant(v)
                }}
                className={cn(
                  'text-xs px-2.5 py-1 rounded-lg border font-medium transition-all relative',
                  selectedVariant.size === v.size
                    ? 'border-brand-green bg-brand-green text-white'
                    : variantSoldOut
                    ? 'border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed line-through'
                    : 'border-gray-200 text-gray-600 hover:border-brand-green hover:text-brand-green',
                )}
              >
                {v.size}
                {variantSoldOut && (
                  <span className="ml-1 text-[9px] text-red-400 not-italic no-underline normal-case">sold out</span>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Price + Add button row */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className={cn(
            'font-bold text-brand-green',
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base',
          )}>
            ₹{price}
          </span>
          {price !== selectedVariant.price && (
            <span className="text-xs text-gray-400 line-through">₹{selectedVariant.price}</span>
          )}
        </div>

        {soldOut ? (
          <div className={cn(
            'flex items-center gap-1.5 font-semibold rounded-full flex-1 justify-center bg-gray-100 text-gray-400 cursor-not-allowed',
            size === 'sm' ? 'text-xs px-3 py-1.5' : size === 'lg' ? 'text-sm px-6 py-3' : 'text-xs px-4 py-2',
          )}>
            <Ban size={size === 'lg' ? 16 : 13} />
            Sold Out
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}
