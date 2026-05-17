import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import StatsSection from '@/components/sections/StatsSection'
import CategorySection from '@/components/sections/CategorySection'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import AboutSection from '@/components/sections/AboutSection'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import TrustSection from '@/components/sections/TrustSection'

export const metadata: Metadata = {
  title: 'Andhra Harvest Foods — Pure Foods from Andhra Lands',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <CategorySection />
      <FeaturedProducts />
      <TrustSection />
      <WhyChooseUs />
      <AboutSection />
    </>
  )
}
