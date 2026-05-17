import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react'
import { categories } from '@/data/products'

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">AH</span>
              </div>
              <div>
                <div className="font-bold text-lg">Andhra Harvest</div>
                <div className="text-brand-gold text-xs tracking-widest uppercase">Foods</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Bringing premium quality food products from trusted farms to families across India and beyond.
            </p>
            <p className="text-white/50 text-xs italic mb-1">ప్రకృతి నుంచి.. మీ ఇంటికి..</p>
            <p className="text-white/40 text-xs mb-5">From Our Fields To Your Table</p>

            {/* Certifications */}
            <div className="space-y-1.5 mb-5">
              <p className="text-white/60 text-xs">
                <span className="text-brand-gold font-semibold">FSSAI:</span> 20126142000562
              </p>
              <p className="text-white/60 text-xs">
                <span className="text-brand-gold font-semibold">GSTIN:</span> 37PUHPS3103L1Z0
              </p>
              <p className="text-white/60 text-xs">
                <span className="text-brand-gold font-semibold">Proprietor:</span> Gurram Sravani
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Our Products */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">
              Our Products
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/products', label: 'All Products' },
                { href: '/quality', label: 'Quality & Packaging' },
                { href: '/exports', label: 'Exports' },
                { href: '/bulk-orders', label: 'Bulk Orders' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-white/60">
                <MapPin size={16} className="shrink-0 mt-0.5 text-brand-gold" />
                <span>
                  F.NO.302, Kousthubha Apartments,<br />
                  Gorantla, Guntur,<br />
                  Andhra Pradesh – 522034
                </span>
              </li>
              <li>
                <a
                  href="tel:+919866669199"
                  className="flex gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={16} className="shrink-0 text-brand-gold" />
                  +91 98666 69199
                </a>
              </li>
              <li>
                <a
                  href="mailto:andhraharvestfoods@gmail.com"
                  className="flex gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Mail size={16} className="shrink-0 text-brand-gold" />
                  andhraharvestfoods@gmail.com
                </a>
              </li>
              <li className="flex gap-3 text-sm text-white/60">
                <Clock size={16} className="shrink-0 mt-0.5 text-brand-gold" />
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>

            {/* Enquire button */}
            <a
              href="https://wa.me/919866669199?text=Hi%20Andhra%20Harvest%20Foods%2C%20I%20have%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Andhra Harvest Foods. All rights reserved.</span>
          <span>Quality · Hygiene · Trust</span>
        </div>
      </div>
    </footer>
  )
}
