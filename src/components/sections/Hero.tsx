'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, LayoutGrid, Leaf, ShieldCheck, Package, Globe } from 'lucide-react'

const trustBadges = [
  { Icon: Leaf, title: 'FARM FRESH', desc: 'Directly sourced from trusted farms' },
  { Icon: ShieldCheck, title: 'FSSAI CERTIFIED', desc: 'Hygienic & safe for your family' },
  { Icon: Package, title: 'PREMIUM PACKAGING', desc: 'Carefully packed to retain freshness' },
  { Icon: Globe, title: 'EXPORT QUALITY', desc: 'Global standards, Andhra pride' },
]


function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section>
      {/* ── Full-screen hero ── */}
      <div className="relative min-h-[calc(100svh-88px)] flex flex-col">

        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/Background.jpeg')" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-20">

          {/* Emblem */}
          <div className="mb-7">
            <Image
              src="/images/Logo.png"
              alt="Andhra Harvest Foods"
              width={140}
              height={140}
              className="mx-auto rounded-full shadow-2xl shadow-black/40"
              priority
            />
          </div>

          {/* Brand name */}
          <h1 className="font-serif font-bold text-white leading-[0.95] uppercase">
            <span className="block text-[clamp(3rem,10vw,6.5rem)] tracking-wider">ANDHRA</span>
            <span className="block text-[clamp(1.6rem,5.5vw,3.8rem)] tracking-[0.22em] mt-1">HARVEST FOODS</span>
          </h1>

          <p className="text-brand-gold text-[11px] md:text-sm tracking-[0.4em] uppercase font-semibold mt-4 mb-5">
            TRADITION · PURITY · TRUST
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-brand-gold/60" />
            <span className="text-brand-gold text-sm">✦</span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-brand-gold/60" />
          </div>

          {/* Hero tagline */}
          <p className="font-serif italic text-brand-gold text-[clamp(1.3rem,4vw,2.4rem)] font-semibold mb-3">
            From Our Fields To Your Table
          </p>
          <p className="text-white/70 text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed">
            Pure. Natural. Authentic. Made with love from our farms to your family.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-light text-white px-7 py-3.5 rounded-[4px] font-bold text-sm tracking-widest uppercase transition-colors shadow-lg"
            >
              <ShoppingBag size={15} />
              SHOP NOW
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white px-7 py-3.5 rounded-[4px] font-bold text-sm tracking-widest uppercase transition-colors shadow-lg"
            >
              <LayoutGrid size={15} />
              EXPLORE PRODUCTS
            </Link>
            <a
              href="https://wa.me/919866669199"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/50 hover:border-white/80 text-white hover:bg-white/10 px-7 py-3.5 rounded-[4px] font-bold text-sm tracking-widest uppercase transition-all"
            >
              <WhatsAppIcon />
              ORDER ON WHATSAPP
            </a>
          </div>
        </div>

        {/* Trust badges */}
        <div className="relative z-10 px-4 pb-6 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trustBadges.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-4 flex items-start gap-3 shadow-lg"
              >
                <div className="shrink-0 w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center">
                  <Icon size={17} className="text-brand-green" />
                </div>
                <div>
                  <p className="text-brand-green font-extrabold text-[11px] tracking-wider uppercase leading-tight">{title}</p>
                  <p className="text-gray-500 text-[11px] mt-0.5 leading-tight">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
