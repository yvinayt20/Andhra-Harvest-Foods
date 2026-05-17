import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bulk Orders & B2B Supply',
  description:
    'Andhra Harvest Foods supports bulk orders for distributors, retailers, supermarkets, hotels, restaurants, and international buyers.',
}

const buyers = [
  { icon: '🏪', label: 'Distributors' },
  { icon: '🛒', label: 'Retail Chains' },
  { icon: '🏬', label: 'Supermarkets' },
  { icon: '🤝', label: 'Wholesalers' },
  { icon: '🍽️', label: 'Hotels & Restaurants' },
  { icon: '✈️', label: 'International Buyers' },
]

const advantages = [
  'Competitive bulk pricing',
  'Flexible packaging options',
  'Private label / custom branding',
  'Consistent supply & quality',
  'Export documentation support',
  'Dedicated relationship manager',
  'Moisture-proof bulk packaging',
  'FSSAI certified products',
]

export default function BulkOrdersPage() {
  return (
    <div className="min-h-screen bg-brand-cream">

      {/* Hero */}
      <section className="bg-brand-green py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Bulk Orders / B2B Supply
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-5">
            Bulk Orders &amp; Distribution
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Looking for a reliable food product supply? We support distributors, retailers, supermarkets, and international buyers with competitive pricing and consistent quality.
          </p>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">We Support</p>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Who We Serve</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {buyers.map((b) => (
              <div
                key={b.label}
                className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 flex flex-col items-center text-center"
              >
                <span className="text-4xl mb-3">{b.icon}</span>
                <p className="font-semibold text-gray-900 text-sm">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages + form */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Advantages */}
            <div>
              <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">B2B Advantages</h2>
              <div className="space-y-3">
                {advantages.map((a) => (
                  <div key={a} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                    <span className="text-gray-700 text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="bg-brand-cream rounded-3xl p-8 border border-gray-100">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Get a Bulk Quote
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                For dealership, bulk purchase, or export enquiries — contact our team. We will respond within 24 hours.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/919866669199?text=Hi%2C%20I%20am%20interested%20in%20bulk%20orders%20from%20Andhra%20Harvest%20Foods."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA58] text-white font-semibold py-3.5 rounded-full text-sm transition-colors"
                >
                  WhatsApp for Bulk Enquiry
                </a>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-light text-white font-semibold py-3.5 rounded-full text-sm transition-colors"
                >
                  Send Enquiry Form
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="tel:+919866669199"
                  className="w-full flex items-center justify-center gap-2 border border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-semibold py-3.5 rounded-full text-sm transition-colors"
                >
                  Call: +91 98666 69199
                </a>
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                Mon – Sat: 9:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
