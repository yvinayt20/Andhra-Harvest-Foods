import { Quote } from 'lucide-react'

const features = [
  {
    icon: '🌱',
    title: 'Carefully Selected',
    desc: 'From trusted farms and quality suppliers',
  },
  {
    icon: '✅',
    title: 'Hygienically Processed',
    desc: 'Clean, sorted and quality checked',
  },
  {
    icon: '📦',
    title: 'Premium Packaging',
    desc: 'Moisture-proof & food grade packing',
  },
  {
    icon: '✈️',
    title: 'Export Quality',
    desc: 'International standards and compliance',
  },
  {
    icon: '🌍',
    title: 'Nationwide & Global Reach',
    desc: 'Supplying across India & expanding globally',
  },
]

export default function TrustSection() {
  return (
    <section className="py-14 md:py-20 bg-white" id="trust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Promise quote */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-green/10 mb-5">
            <Quote size={22} className="text-brand-green" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold mb-3">
            Our Promise
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 max-w-2xl mx-auto leading-snug">
            &ldquo;We don&apos;t just sell food — we deliver trust, quality, and care to every family.&rdquo;
          </h2>
        </div>

        {/* 5-column feature bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-brand-cream border border-gray-100"
            >
              <span className="text-3xl mb-3">{f.icon}</span>
              <p className="font-semibold text-gray-900 text-sm mb-1">{f.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
