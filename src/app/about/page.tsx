import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Andhra Harvest Foods — our story, mission, and commitment to bringing premium quality food from Andhra farms to families.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream">

      {/* Hero */}
      <section className="bg-brand-green py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-5">
            Andhra Harvest Foods
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded with a vision to deliver purity, nutrition, and authentic taste — from trusted Andhra farms to families across India and beyond.
          </p>
        </div>
      </section>

      {/* About content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div>
              <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight mb-5">
                Pure Foods from Andhra Lands — Grown with Love
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                At Andhra Harvest Foods, we are committed to bringing premium quality food products from trusted farms to families across India and beyond. We carefully source high-quality grains, pulses, spices, flours, seeds, and food essentials from trusted farming communities and quality suppliers.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Every product is selected with care, hygienically processed, and packed to preserve freshness, taste, and nutrition. Our goal is simple: to build trust through quality food while supporting farmers and serving healthier families.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                From daily essentials like rice and dals to premium spices and specialty foods — Andhra Harvest Foods stands for quality you can taste and trust you can rely on.
              </p>

              <div className="border-l-4 border-brand-gold pl-4 mb-8">
                <p className="text-brand-green font-semibold text-lg">ప్రకృతి నుంచి.. మీ ఇంటికి..</p>
                <p className="text-gray-500 text-sm mt-1">&ldquo;From Nature… to Your Home&rdquo;</p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-brand-green text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-brand-green-light transition-colors"
              >
                Explore Our Products
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  title: 'Quality You Can Trust',
                  desc: 'Every product undergoes careful selection, cleaning, and quality checks before it reaches you.',
                },
                {
                  title: 'Hygienically Packed',
                  desc: 'Moisture-proof, food-grade packaging preserves freshness from farm to your home.',
                },
                {
                  title: 'Carefully Selected Ingredients',
                  desc: 'We source only from verified farmers and suppliers who share our commitment to quality.',
                },
                {
                  title: 'Export Quality Standards',
                  desc: 'All products meet international food safety and packaging standards.',
                },
                {
                  title: 'Honest & Transparent Business',
                  desc: 'No middlemen, no unnecessary markups — fair prices for farmers and customers alike.',
                },
                {
                  title: 'FSSAI Certified',
                  desc: 'Lic. No. 20126142000562 — all products meet FSSAI safety and quality norms.',
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="bg-white rounded-2xl p-5 shadow-card border border-gray-100"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-gray-900 text-sm">{v.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed pl-6">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business details */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">Business Details</p>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Andhra Harvest Foods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Proprietor', value: 'Gurram Sravani' },
              { label: 'FSSAI Licence', value: '20126142000562' },
              { label: 'GSTIN', value: '37PUHPS3103L1Z0' },
              { label: 'Location', value: 'Guntur, Andhra Pradesh' },
            ].map((d) => (
              <div key={d.label} className="bg-brand-cream rounded-2xl p-5 border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{d.label}</p>
                <p className="font-semibold text-gray-900 text-sm">{d.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
