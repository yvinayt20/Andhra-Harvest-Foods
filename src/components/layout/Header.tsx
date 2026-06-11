'use client'

'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingCart, Phone, ChevronDown, Globe, Search, User, LogOut, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { useLanguage, LANGUAGES, type Language } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'

const productCategories = [
  { href: '/products?category=rice-millets', label: 'Rice & Millets', icon: '🌾' },
  { href: '/products?category=dals-nuts', label: 'Dals & Nuts', icon: '🫘' },
  { href: '/products?category=whole-spices', label: 'Whole Spices', icon: '🌿' },
  { href: '/products?category=powders', label: 'Spice Powders', icon: '🌶️' },
  { href: '/products?category=flours', label: 'Flours', icon: '🌻' },
  { href: '/products?category=cooking-essentials', label: 'Cooking Essentials', icon: '🫙' },
  { href: '/products?category=beverages', label: 'Beverages', icon: '☕' },
  { href: '/products?category=wellness-range', label: 'Wellness Range', icon: '💚' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const { totalItems } = useCart()
  const { language, setLanguage, t } = useLanguage()
  const { user, signOut, isAdmin } = useAuth()
  const langRef = useRef<HTMLDivElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)

  const navLinks = [
    { href: '/', label: t.navHome },
    { href: '/about', label: t.navAbout },
    { href: '/products', label: 'Shop', hasDropdown: true },
    { href: '/products', label: 'Categories', hasCategories: true },
    { href: '/quality', label: t.navQuality },
    { href: '/contact', label: t.navContact },
  ]

  // Close language + account dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleLangSelect(code: Language) {
    setLanguage(code)
    setLangOpen(false)
  }

  const currentLang = LANGUAGES.find((l) => l.code === language)!

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top announcement bar */}
      <div className="bg-brand-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">

          {/* Language switcher — top left */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-colors"
              aria-label="Change language"
            >
              <Globe size={13} />
              <span>{currentLang.nativeLabel}</span>
              <ChevronDown size={11} className={cn('transition-transform', langOpen && 'rotate-180')} />
            </button>

            {langOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangSelect(lang.code)}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors',
                      lang.code === language
                        ? 'text-brand-green font-semibold bg-brand-green-50'
                        : 'text-gray-700 hover:text-brand-green hover:bg-brand-green-50',
                    )}
                  >
                    {lang.code === language && (
                      <span className="text-brand-green text-xs">✓</span>
                    )}
                    {lang.code !== language && <span className="w-3" />}
                    {lang.nativeLabel}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Phone — top right */}
          <a
            href="tel:+919866669199"
            className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-colors"
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
              <Image
                src="/images/Logo.png"
                alt="Andhra Harvest Foods"
                width={56}
                height={56}
                className="rounded-full object-cover"
                priority
              />
              <div className="leading-tight hidden sm:block">
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
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key="shop-dropdown"
                      className="relative"
                      onMouseEnter={() => setProductsOpen(true)}
                      onMouseLeave={() => setProductsOpen(false)}
                    >
                      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors">
                        {link.label}
                        <ChevronDown size={14} className={cn('transition-transform', productsOpen && 'rotate-180')} />
                      </button>
                      {productsOpen && (
                        <div className="absolute top-full left-0 w-56 pt-1 z-50">
                          <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                            <Link
                              href="/products"
                              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-brand-green hover:bg-brand-green-50 transition-colors"
                            >
                              {t.navAllProducts}
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
                        </div>
                      )}
                    </div>
                  )
                }
                if (link.hasCategories) {
                  return (
                    <div
                      key="categories-dropdown"
                      className="relative"
                      onMouseEnter={() => setCategoriesOpen(true)}
                      onMouseLeave={() => setCategoriesOpen(false)}
                    >
                      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors">
                        {link.label}
                        <ChevronDown size={14} className={cn('transition-transform', categoriesOpen && 'rotate-180')} />
                      </button>
                      {categoriesOpen && (
                        <div className="absolute top-full left-0 w-56 pt-1 z-50">
                          <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2">
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
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                className="p-2.5 text-gray-600 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Account dropdown */}
              <div ref={accountRef} className="relative">
                <button
                  onClick={() => setAccountOpen((o) => !o)}
                  className="p-2.5 text-gray-600 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors"
                  aria-label="Account"
                >
                  <User size={20} />
                </button>
                {accountOpen && (
                  <div className="absolute top-full right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                    {user ? (
                      <>
                        <p className="px-4 py-2 text-xs text-gray-400 truncate">{user.email}</p>
                        <div className="border-t border-gray-100 my-1" />
                        <Link href="/account" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-brand-green hover:bg-brand-green-50 transition-colors">
                          <User size={14} /> My Account
                        </Link>
                        {isAdmin && (
                          <Link href="/admin" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-brand-green hover:bg-brand-green-50 transition-colors">
                            <ShieldCheck size={14} /> Admin Panel
                          </Link>
                        )}
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={() => { signOut(); setAccountOpen(false) }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/login" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-brand-green hover:bg-brand-green-50 transition-colors">
                          Sign In
                        </Link>
                        <Link href="/auth/signup" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-brand-green hover:bg-brand-green-50 transition-colors">
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Link
                href="/cart"
                className="relative p-2.5 text-gray-600 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-brand-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
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
            {t.shopNow}
          </Link>
          <div className="border-t border-gray-100 my-2" />
          {user ? (
            <>
              <Link href="/account" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm text-gray-700 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors flex items-center gap-2">
                <User size={16} /> My Account
              </Link>
              {isAdmin && (
                <Link href="/admin" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm text-gray-700 hover:text-brand-green rounded-lg hover:bg-brand-green-50 transition-colors flex items-center gap-2">
                  <ShieldCheck size={16} /> Admin Panel
                </Link>
              )}
              <button
                onClick={() => { signOut(); setMobileOpen(false) }}
                className="px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 w-full"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-brand-green hover:bg-brand-green-50 rounded-lg transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-sm text-gray-700 hover:text-brand-green hover:bg-brand-green-50 rounded-lg transition-colors">
                Create Account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
