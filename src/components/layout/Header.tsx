'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products', hasDropdown: true },
  { href: '/quality', label: 'Quality & Packaging' },
  { href: '/exports', label: 'Exports' },
  { href: '/bulk-orders', label: 'Bulk Orders' },
  { href: '/contact', label: 'Contact Us' },
]

const productCategories = [
  { href: '/products?category=rice-millets', label: 'Rice & Millets', icon: '🌾' },
  { href: '/products?category=dals-nuts', label: 'Dals & Nuts', icon: '🫘' },
  { href: '/products?category=whole-spices', label: 'Whole Spices', icon: '🌿' },
  { href: '/products?category=powders', label: 'Spice Powders', icon: '🌶️' },
  { href: '/products?category=flours', label: 'Flours', icon: '🌻' },
  { href: '/products?category=cooking-essentials', label: 'Cooking Essentials', icon: '🫙' },
  { href: '/products?category=beverages', label: 'Beverages', icon: '☕' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top announcement bar */}
      <div className="bg-brand-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <p className="text-xs text-white/80 hidden sm:block">
            Welcome to Andhra Harvest Foods — Premium Quality Foods for Every Home
          </p>
          <a
            href="tel:+919866669199"
            className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-colors ml-auto"
          >
            <Phone size={12} />
            +91 98666 69199
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold leading-tight text-center">AH</span>
              </div>
              <div className="leading-tight">
                <div className="text-brand-green font-bold text-base md:text-lg tracking-tight">
                  Andhra Harvest
                </div>
                <div className="text-brand-gold text-[10px] tracking-widest uppercase font-medium">
                  From Our Fields To Your Table
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors">
                      {link.label}
                      <ChevronDown size={14} className={cn('transition-transform', productsOpen && 'rotate-180')} />
                    </button>
                    {productsOpen && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                        <Link
                          href="/products"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-brand-green hover:bg-brand-green-50 transition-colors"
                        >
                          All Products →
                        </Link>
                        <div className="border-t border-gray-100 my-1" />
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:text-brand-green hover:bg-brand-green-50 transition-colors"
                          >
                            <span>{cat.icon}</span>
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 text-gray-700 hover:text-brand-green transition-colors p-2 rounded-lg hover:bg-brand-green-50"
                aria-label="Cart"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              <Link
                href="/products"
                className="flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-green-light transition-colors"
              >
                Shop Now
              </Link>
            </div>

            {/* Mobile: cart + menu */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-brand-green"
                aria-label="Cart"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-brand-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                className="p-2 text-gray-600 hover:text-brand-green"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden border-t border-gray-100 bg-white transition-all duration-300 overflow-hidden',
          mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="px-4 pt-2 pb-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 my-2" />
          <p className="px-4 text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
            Product Categories
          </p>
          {productCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 text-sm text-gray-700 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors flex items-center gap-2"
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
          <Link
            href="/products"
            onClick={() => setMobileOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 bg-brand-green text-white px-5 py-3 rounded-full text-sm font-semibold"
          >
            Shop Now
          </Link>
        </nav>
      </div>
    </header>
  )
}
