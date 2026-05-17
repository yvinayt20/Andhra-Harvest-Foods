import { CheckCircle2 } from 'lucide-react'

const points = [
  'Premium Quality Products',
  'Hygienically Packed',
  'Carefully Selected Ingredients',
  'Trusted Sourcing Network',
  'Moisture-Proof Packaging',
  'Export Ready Standards',
  'Bulk Supply Available',
  'Competitive Pricing',
  'Consistent Quality',
  'Customer Satisfaction Focused',
]

export default function WhyChooseUs() {
  return (
    <section className="py-14 md:py-20 bg-brand-green" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-5">
              Why Andhra Harvest Foods?
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              At Andhra Harvest Foods, quality comes first. We are committed to delivering food
              that meets the highest standards — from careful sourcing to safe packaging.
            </p>

            {/* Checklist — two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {points.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-brand-gold shrink-0" />
                  <span className="text-white/85 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: key stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '45+', label: 'Products', sub: 'Across 7 categories' },
              { value: '100%', label: 'Natural', sub: 'No artificial additives' },
              { value: 'FSSAI', label: 'Certified', sub: 'Lic. No. 20126142000562' },
              { value: 'PAN', label: 'India Reach', sub: 'Expanding globally' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 border border-white/15 rounded-2xl p-5 text-center"
              >
                <div className="text-brand-gold text-2xl md:text-3xl font-bold font-serif mb-1">
                  {stat.value}
                </div>
                <div className="text-white font-semibold text-sm">{stat.label}</div>
                <div className="text-white/50 text-xs mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
