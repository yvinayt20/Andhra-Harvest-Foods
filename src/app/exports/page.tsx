import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Exports & International Trade',
  description:
    'Andhra Harvest Foods exports premium Indian food products — rice, pulses, spices, and more — to international markets.',
}

const exportProducts = [
  { icon: '🌾', name: 'Rice', desc: 'Regular, Basmati, Parboiled, Brown Rice' },
  { icon: '🫘', name: 'Pulses & Lentils', desc: 'Toor Dal, Moong Dal, Chana Dal, Urad Dal' },
  { icon: '🌶️', name: 'Spices & Powders', desc: 'Chilli, Turmeric, Cumin, Coriander powders' },
  { icon: '🌻', name: 'Flour Products', desc: 'Wheat, Rice, Ragi, Besan, Jowar flours' },
  { icon: '🌱', name: 'Seeds & Essentials', desc: 'Cumin, Coriander, Sesame, Ajwain seeds' },
]

const exportSupport = [
  'International Packaging Standards',
  'Food Grade Packing',
  'Export Documentation Support',
  'Bulk Supply Capability',
  'Moisture-Proof Export Bags',
  'Consistent Quality Batches',
]

export default function ExportsPage() {
  return (
    <div className="min-h-screen bg-brand-cream">

      {/* Hero */}
      <section className="bg-brand-green py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Exports / International Trade
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-5">
            Export Capability
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Andhra Harvest Foods aims to serve international markets with high-quality Indian food products. We are expanding our reach to supply premium food essentials to distributors, wholesalers, supermarkets, and international buyers.
          </p>
        </div>
      </section>

      {/* Sourcing note */}
      <section className="py-10 bg-brand-gold/10 border-y border-brand-gold/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-brand-green font-semibold text-base md:text-lg leading-relaxed">
            &ldquo;Carefully sourced from trusted farms and quality suppliers — only from Andhra lands.&rdquo;
          </p>
        </div>
      </section>

      {/* Export products */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">What We Export</p>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Export Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {exportProducts.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 text-center">
                <span className="text-4xl mb-3 block">{p.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{p.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export support */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">Export Support</p>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">What We Provide</h2>
              <div className="space-y-3">
                {exportSupport.map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                    <span className="text-gray-700 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-cream rounded-3xl p-8 border border-gray-100">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                Available Packaging for Export
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🛒', label: 'Retail Packs' },
                  { icon: '📦', label: 'Bulk Packaging' },
                  { icon: '🏷️', label: 'Private Label' },
                  { icon: '✏️', label: 'Custom Branding' },
                ].map((p) => (
                  <div key={p.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                    <span className="text-2xl mb-2 block">{p.icon}</span>
                    <p className="text-sm font-semibold text-gray-800">{p.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-brand-green text-white font-semibold py-3.5 rounded-full text-sm hover:bg-brand-green-light transition-colors"
                >
                  Enquire for Export
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
