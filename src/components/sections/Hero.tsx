import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const trustIcons = [
  { icon: '🌿', label: '100% Natural' },
  { icon: '👑', label: 'Premium Quality' },
  { icon: '📦', label: 'Hygienically Packed' },
  { icon: '🤝', label: 'Trusted by Families' },
]

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#1B4332' }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/images/brand-banner.jpg')" }}
      />
      <div className="absolute inset-0 bg-hero-pattern opacity-40" />

      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Text */}
          <div>
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">
                ♻ Sourced Only from Andhra Lands
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-[1.1] mb-4">
              Premium Foods.<br />
              Trusted Quality.<br />
              <span className="text-brand-gold">Healthier Families.</span>
            </h1>

            {/* Subheading */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Pure grains, pulses, spices &amp; essentials — carefully selected and hygienically packed for every home.
            </p>

            {/* Trust icon row */}
            <div className="flex flex-wrap gap-3 mb-8">
              {trustIcons.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5"
                >
                  <span className="text-sm">{t.icon}</span>
                  <span className="text-white/85 text-xs font-medium">{t.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all shadow-lg"
              >
                Explore Products
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/bulk-orders"
                className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/25 transition-all"
              >
                Bulk Orders
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/30 text-white/80 px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right: Product showcase card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-3xl p-7">
                <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4 text-center">
                  Our Product Range
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '🌾', name: 'Rice & Millets', sub: 'Premium quality grains' },
                    { icon: '🫘', name: 'Dals & Pulses', sub: 'High protein, natural' },
                    { icon: '🌶️', name: 'Spices & Powders', sub: 'Authentic Andhra taste' },
                    { icon: '🌻', name: 'Flour Products', sub: 'Stone-ground, pure' },
                    { icon: '🫙', name: 'Cooking Essentials', sub: 'Ghee, jaggery & more' },
                    { icon: '☕', name: 'Beverages', sub: 'Tea & filter coffee' },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="bg-white/10 rounded-2xl p-3.5 flex items-center gap-3"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="text-white text-sm font-semibold leading-tight">{item.name}</p>
                        <p className="text-white/60 text-xs mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promise */}
                <div className="mt-5 bg-brand-gold/20 border border-brand-gold/30 rounded-2xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CheckCircle2 size={16} className="text-brand-gold" />
                    <span className="text-white font-semibold text-sm">Our Promise</span>
                  </div>
                  <p className="text-white/75 text-xs leading-relaxed">
                    &ldquo;We don&apos;t just sell food — we deliver trust, quality, and care to every family.&rdquo;
                  </p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-brand-gold text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                FSSAI Certified
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-brand-green text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                45+ Products
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60H1440V30C1200 0 960 60 720 30C480 0 240 60 0 30V60Z" fill="#FFFBF0" />
        </svg>
      </div>
    </section>
  )
}
