import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  title: {
    default: 'Andhra Harvest Foods — Pure Foods from Andhra Lands',
    template: '%s | Andhra Harvest Foods',
  },
  description:
    'Premium quality rice, dals, spices, flours, and more — sourced directly from Andhra Pradesh farmers. 100% natural, no preservatives.',
  keywords: ['Andhra harvest foods', 'rice', 'dals', 'spices', 'organic', 'Andhra Pradesh', 'Telugu'],
  openGraph: {
    title: 'Andhra Harvest Foods',
    description: 'Pure Foods From Farmers To Families',
    siteName: 'Andhra Harvest Foods',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
