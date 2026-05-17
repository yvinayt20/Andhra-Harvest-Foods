import { Leaf, Shield, Truck, Award, Users, Star } from 'lucide-react'

const stats = [
  { icon: <Star size={22} className="text-brand-gold" />, value: '43+', label: 'Products', sub: 'Across 7 categories' },
  { icon: <Leaf size={22} className="text-green-600" />, value: '100%', label: 'Natural', sub: 'No preservatives' },
  { icon: <Users size={22} className="text-blue-600" />, value: 'Direct', label: 'From Farmers', sub: 'Trusted Andhra farmers' },
  { icon: <Shield size={22} className="text-purple-600" />, value: 'FSSAI', label: 'Certified', sub: 'Safe & hygienic' },
]

export default function StatsSection() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
