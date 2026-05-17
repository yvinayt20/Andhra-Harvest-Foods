import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Leaf, Shield, CheckCircle2, ArrowLeft } from 'lucide-react'
import {
  getProductBySlug,
  getCategoryBySlug,
  getProductsByCategory,
  products as allProducts,
} from '@/data/products'
import { getCategoryColors } from '@/lib/utils'
import ProductCard from '@/components/ui/ProductCard'
import AddToCartButton from '@/components/ui/AddToCartButton'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} (${product.nameTelugu})`,
    description: product.description,
  }
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const category = getCategoryBySlug(product.categorySlug)
  const colors = getCategoryColors(product.categorySlug)
  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const categoryIcons: Record<string, string> = {
    'rice-millets': '🌾',
    'dals-nuts': '🫘',
    'whole-spices': '🌿',
    'powders': '🌶️',
    'flours': '🌻',
    'cooking-essentials': '🫙',
    'beverages': '☕',
  }
  const icon = categoryIcons[product.categorySlug] ?? '🌾'

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-brand-green transition-colors">Products</Link>
            <ChevronRight size={14} />
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="hover:text-brand-green transition-colors"
            >
              {category?.name}
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-800 font-medium truncate max-w-[160px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden bg-white shadow-card min-h-[340px] md:min-h-[480px]">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div
                className={`w-full h-full min-h-[340px] flex flex-col items-center justify-center bg-gradient-to-br ${colors.placeholderFrom} ${colors.placeholderTo}`}
              >
                <span className="text-8xl mb-4">{icon}</span>
                <span className={`text-sm font-bold uppercase tracking-widest ${colors.textColor}`}>
                  Andhra Harvest Foods
                </span>
                <span className={`text-xs mt-1 opacity-70 ${colors.textColor}`}>
                  {product.name}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Back */}
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-green mb-5 transition-colors w-fit"
            >
              <ArrowLeft size={14} />
              Back to Products
            </Link>

            {/* Category badge */}
            <span
              className={`inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${colors.badgeBg}`}
            >
              {icon} {category?.name}
            </span>

            {/* Names */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-brand-gold text-xl font-medium mt-1">{product.nameTelugu}</p>

            {/* Description */}
            <p className="text-gray-600 mt-4 leading-relaxed text-base">
              {product.longDescription ?? product.description}
            </p>

            {/* Add to Cart with variant selector */}
            <div className="mt-6 bg-brand-cream rounded-2xl p-5 border border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                Select Size &amp; Add to Cart
              </p>
              <AddToCartButton product={product} size="lg" />
              <p className="text-xs text-gray-400 mt-3">
                GST ({product.gstRate}%) included in price
              </p>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Product Highlights
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust bar */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: <Leaf size={16} />, label: '100% Natural' },
                { icon: <Shield size={16} />, label: 'FSSAI Certified' },
                { icon: <CheckCircle2 size={16} />, label: 'No Preservatives' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center p-3 rounded-xl bg-brand-green-50 text-brand-green gap-1"
                >
                  {item.icon}
                  <span className="text-[10px] font-semibold leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-7">
              More from {category?.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
