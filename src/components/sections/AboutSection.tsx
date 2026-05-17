import { Leaf, Shield, Users, Star, Sprout, Heart } from 'lucide-react'

const values = [
  {
    icon: <Leaf size={24} />,
    title: 'Pure & Natural',
    titleTelugu: 'స్వచ్ఛమైన & సహజమైన',
    description:
      'Every product is 100% natural, free from artificial colours, flavours, or preservatives.',
  },
  {
    icon: <Users size={24} />,
    title: 'Directly from Farmers',
    titleTelugu: 'రైతుల నుంచి నేరుగా',
    description:
      'We source directly from trusted Andhra Pradesh farmers, ensuring freshness and fair prices.',
  },
  {
    icon: <Shield size={24} />,
    title: 'FSSAI Certified',
    titleTelugu: 'నాణ్యత నిరూపించబడింది',
    description:
      'All products are hygienically packed and meet FSSAI safety and quality standards.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Packed with Care',
    titleTelugu: 'శ్రద్ధగా ప్యాక్ చేయబడింది',
    description:
      'We carefully pack and seal every product to preserve freshness from farm to your home.',
  },
]

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-cream" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Story */}
          <div>
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight mb-5">
              Pure Foods from Andhra Lands — Grown with Love
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Andhra Harvest Foods was born from a simple belief: your family deserves to eat
              food that is as pure and wholesome as nature intended. We work hand-in-hand with
              farmers across Andhra Pradesh who have tended their land for generations.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Every grain, every spice, every dal we offer goes through careful quality checks
              before being packed hygienically and delivered to your home. No middlemen. No
              unnecessary additives. Just real, honest food.
            </p>

            {/* Telugu tagline */}
            <div className="border-l-4 border-brand-gold pl-4">
              <p className="text-brand-green font-semibold text-lg">
                ప్రకృతి నుంచి.. మీ ఇంటికి..
              </p>
              <p className="text-gray-500 text-sm mt-1">
                &ldquo;From Nature… to Your Home&rdquo;
              </p>
            </div>
          </div>

          {/* Right: Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 hover:shadow-card-hover transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-green-50 text-brand-green flex items-center justify-center mb-3">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{value.title}</h3>
                <p className="text-brand-gold text-xs mt-0.5 mb-2">{value.titleTelugu}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
