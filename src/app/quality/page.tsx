import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Quality & Packaging',
  description:
    'Learn about Andhra Harvest Foods quality commitment — careful selection, hygienic processing, moisture-proof packaging, and FSSAI certified products.',
}

const steps = [
  { step: '01', title: 'Careful Selection', desc: 'We source only from verified farmers and trusted suppliers. Every batch is inspected before procurement.' },
  { step: '02', title: 'Cleaning & Sorting', desc: 'Products are thoroughly cleaned, sorted by size and quality, and any substandard items are removed.' },
  { step: '03', title: 'Hygienic Handling', desc: 'All processing is done in clean, sanitised environments. Staff follow strict food safety hygiene protocols.' },
  { step: '04', title: 'Secure Packaging', desc: 'Products are packed in moisture-proof, food-grade material to lock in freshness and prevent contamination.' },
  { step: '05', title: 'Quality Checks', desc: 'Every batch undergoes final quality inspection before dispatch. Non-conforming batches are rejected.' },
]

const packagingOptions = [
  { icon: '📦', title: 'Retail Packs', desc: 'Consumer-friendly sizes from 100g to 5kg with branded packaging and clear product information.' },
  { icon: '🏭', title: 'Bulk Packaging', desc: '10kg, 25kg, and 50kg bags for distributors, retailers, and institutional buyers.' },
  { icon: '🏷️', title: 'Private Label Packaging', desc: 'Custom branding for your business. We pack our quality products under your brand name.' },
  { icon: '✏️', title: 'Custom Branding', desc: 'Custom label design, sizes, and packaging options available for B2B partners.' },
]

export default function QualityPage() {
  return (
    <div className="min-h-screen bg-brand-cream">

      {/* Hero */}
      <section className="bg-brand-green py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Quality & Packaging
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-5">
            Our Commitment to Quality
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            At Andhra Harvest Foods, quality comes first. We ensure freshness, taste, and consistency in every pack.
          </p>
        </div>
      </section>

      {/* Quality process */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">Our Process</p>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Every Product Undergoes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 text-center">
                <div className="w-12 h-12 rounded-full bg-brand-green text-white font-bold text-lg font-serif flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-6 py-3 rounded-full font-semibold text-sm">
              <CheckCircle2 size={18} />
              We ensure freshness, taste, and consistency in every pack.
            </div>
          </div>
        </div>
      </section>

      {/* Packaging options */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">Packaging Options</p>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Available Packaging</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packagingOptions.map((p) => (
              <div key={p.title} className="bg-brand-cream rounded-2xl p-6 border border-gray-100">
                <span className="text-4xl mb-4 block">{p.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-14 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">Certifications</p>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Certified & Compliant</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'FSSAI Certified', value: 'Lic. No. 20126142000562', icon: '✅' },
              { title: 'GSTIN Registered', value: '37PUHPS3103L1Z0', icon: '🏛️' },
              { title: 'Export Ready', value: 'International packaging standards', icon: '✈️' },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 text-center">
                <span className="text-3xl mb-3 block">{c.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{c.title}</h3>
                <p className="text-gray-500 text-sm">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
