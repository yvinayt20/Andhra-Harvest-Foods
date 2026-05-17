import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Andhra Harvest Foods for orders, export enquiries, bulk purchases, or any queries.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-cream">

      {/* Hero */}
      <section className="bg-brand-green py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-5">
            Get in Touch
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            For orders, bulk enquiries, export queries, or any questions — we&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Address</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        F.NO.302, Kousthubha Apartments,<br />
                        Gorantla, Guntur,<br />
                        Andhra Pradesh – 522034
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Phone</p>
                      <a
                        href="tel:+919866669199"
                        className="text-brand-green text-sm font-medium hover:underline"
                      >
                        +91 98666 69199
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Email</p>
                      <a
                        href="mailto:andhraharvestfoods@gmail.com"
                        className="text-brand-green text-sm font-medium hover:underline"
                      >
                        andhraharvestfoods@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Business Hours</p>
                      <p className="text-gray-600 text-sm">Mon – Sat: 9:00 AM – 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business details */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Business Details</p>
                <div className="space-y-2">
                  {[
                    { label: 'Proprietor', value: 'Gurram Sravani' },
                    { label: 'FSSAI', value: '20126142000562' },
                    { label: 'GSTIN', value: '37PUHPS3103L1Z0' },
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{d.label}</span>
                      <span className="font-medium text-gray-900">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919866669199?text=Hi%20Andhra%20Harvest%20Foods%2C%20I%20have%20an%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20BA58] text-white font-semibold py-3.5 rounded-full text-sm transition-colors"
              >
                <span className="text-lg">💬</span>
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <form
                  action={`mailto:andhraharvestfoods@gmail.com`}
                  method="POST"
                  encType="text/plain"
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your full name"
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Enquiry Type
                    </label>
                    <select
                      name="enquiry_type"
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green bg-white"
                    >
                      <option value="">Select enquiry type</option>
                      <option value="product">Product Enquiry</option>
                      <option value="bulk">Bulk Order / B2B</option>
                      <option value="export">Export Enquiry</option>
                      <option value="delivery">Delivery / Logistics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us how we can help you..."
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-green text-white font-semibold py-3.5 rounded-full text-sm hover:bg-brand-green-light transition-colors"
                  >
                    Send Message
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Or WhatsApp us directly at +91 98666 69199 for a faster response.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
