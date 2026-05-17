'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  FileText,
  Printer,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import type { OrderDetails } from '@/types'

const GSTIN = '37PUHPS3103L1Z0'
const FSSAI = '20126142000562'
const BUSINESS_ADDRESS = 'F.NO.302, Kousthubha Apartments, Gorantla, Guntur, Andhra Pradesh – 522034'
const PHONE = '+91 98666 69199'
const EMAIL = 'andhraharvestfoods@gmail.com'
const PROPRIETOR = 'Gurram Sravani'

function generateInvoiceNumber() {
  const d = new Date()
  return `AHF-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`
}

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, subtotal } = useCart()
  const [order, setOrder] = useState<OrderDetails>({
    name: '', phone: '', address: '', city: '', pincode: '', notes: '',
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [invoiceNo] = useState(generateInvoiceNumber)
  const invoiceRef = useRef<HTMLDivElement>(null)

  const gstAmount = items.reduce((sum, i) => {
    const lineTotal = i.price * i.quantity
    return sum + lineTotal * (i.gstRate / 100)
  }, 0)
  const totalWithGst = subtotal + gstAmount

  function handleWhatsApp() {
    const lines = items.map(
      (i) => `• ${i.productName} (${i.size}) × ${i.quantity} = ₹${(i.price * i.quantity).toLocaleString('en-IN')}`,
    )
    const msg = [
      `*New Order — Andhra Harvest Foods*`,
      `Invoice No: ${invoiceNo}`,
      ``,
      `*Customer Details*`,
      `Name: ${order.name || 'Not provided'}`,
      `Phone: ${order.phone || 'Not provided'}`,
      `Address: ${[order.address, order.city, order.pincode].filter(Boolean).join(', ') || 'Not provided'}`,
      order.notes ? `Notes: ${order.notes}` : '',
      ``,
      `*Order Items*`,
      ...lines,
      ``,
      `Subtotal: ₹${subtotal.toLocaleString('en-IN')}`,
      `GST: ₹${gstAmount.toFixed(2)}`,
      `*Total: ₹${totalWithGst.toFixed(2)}*`,
    ]
      .filter((l) => l !== undefined)
      .join('\n')

    window.open(
      `https://wa.me/919866669199?text=${encodeURIComponent(msg)}`,
      '_blank',
    )
  }

  function handlePrint() {
    window.print()
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center py-24 px-4">
        <ShoppingCart size={56} className="text-gray-300 mb-5" />
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-7">Add some products to get started</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-brand-green text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-brand-green-light transition-colors"
        >
          Browse Products
          <ChevronRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Print-only invoice */}
      <div ref={invoiceRef} className="hidden print:block p-8 text-sm font-sans">
        {/* Invoice header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-gray-900">ANDHRA HARVEST FOODS</h1>
              <p className="text-xs text-gray-600 mt-1">{BUSINESS_ADDRESS}</p>
              <p className="text-xs text-gray-600">Phone: {PHONE} | Email: {EMAIL}</p>
              <p className="text-xs text-gray-600">Proprietor: {PROPRIETOR}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold">GSTIN: {GSTIN}</p>
              <p className="text-xs">FSSAI: {FSSAI}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <p className="font-bold text-base">TAX INVOICE</p>
            <p className="text-xs text-gray-600">Invoice No: {invoiceNo}</p>
            <p className="text-xs text-gray-600">Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
          {(order.name || order.address) && (
            <div className="text-right">
              <p className="font-semibold text-xs">Bill To:</p>
              <p className="text-xs">{order.name}</p>
              <p className="text-xs text-gray-600">{order.phone}</p>
              <p className="text-xs text-gray-600">
                {[order.address, order.city, order.pincode].filter(Boolean).join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Items table */}
        <table className="w-full border-collapse text-xs mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">S.No</th>
              <th className="border border-gray-300 p-2 text-left">Product</th>
              <th className="border border-gray-300 p-2 text-left">Size</th>
              <th className="border border-gray-300 p-2 text-right">Unit Price</th>
              <th className="border border-gray-300 p-2 text-center">Qty</th>
              <th className="border border-gray-300 p-2 text-right">GST%</th>
              <th className="border border-gray-300 p-2 text-right">GST Amt</th>
              <th className="border border-gray-300 p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              const lineTotal = item.price * item.quantity
              const lineGst = lineTotal * (item.gstRate / 100)
              return (
                <tr key={`${item.productId}-${item.size}`}>
                  <td className="border border-gray-300 p-2">{idx + 1}</td>
                  <td className="border border-gray-300 p-2">{item.productName}</td>
                  <td className="border border-gray-300 p-2">{item.size}</td>
                  <td className="border border-gray-300 p-2 text-right">₹{item.price.toLocaleString('en-IN')}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
                  <td className="border border-gray-300 p-2 text-right">{item.gstRate}%</td>
                  <td className="border border-gray-300 p-2 text-right">₹{lineGst.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2 text-right">₹{(lineTotal + lineGst).toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <table className="text-xs">
            <tbody>
              <tr>
                <td className="pr-8 py-1 text-gray-600">Subtotal (excl. GST)</td>
                <td className="text-right font-medium">₹{subtotal.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td className="pr-8 py-1 text-gray-600">GST</td>
                <td className="text-right font-medium">₹{gstAmount.toFixed(2)}</td>
              </tr>
              <tr className="border-t border-gray-800">
                <td className="pr-8 py-1.5 font-bold text-sm">Total Amount</td>
                <td className="text-right font-bold text-sm">₹{totalWithGst.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {order.notes && (
          <p className="text-xs text-gray-600 mt-4 border-t pt-3">Notes: {order.notes}</p>
        )}

        <p className="text-xs text-gray-500 mt-6 text-center">
          Thank you for your order! For queries: {PHONE} | {EMAIL}
        </p>
        <p className="text-xs text-gray-400 text-center mt-1">
          This is a computer-generated invoice. No signature required.
        </p>
      </div>

      {/* Screen view */}
      <div className="print:hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-1.5 text-sm text-gray-500">
              <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-gray-800 font-medium">Cart</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-green transition-colors"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
            <span className="text-gray-300">|</span>
            <h1 className="text-2xl font-serif font-bold text-gray-900">
              Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const lineTotal = item.price * item.quantity
                return (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 flex items-center gap-4"
                  >
                    {/* Category emoji */}
                    <div className="w-14 h-14 rounded-xl bg-brand-cream flex items-center justify-center shrink-0 text-2xl">
                      {item.categorySlug === 'rice-millets' ? '🌾' :
                       item.categorySlug === 'dals-nuts' ? '🫘' :
                       item.categorySlug === 'whole-spices' ? '🌿' :
                       item.categorySlug === 'powders' ? '🌶️' :
                       item.categorySlug === 'flours' ? '🌻' :
                       item.categorySlug === 'cooking-essentials' ? '🫙' : '☕'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="font-semibold text-gray-900 text-sm hover:text-brand-green transition-colors line-clamp-1"
                      >
                        {item.productName}
                      </Link>
                      <p className="text-brand-gold text-xs mt-0.5">{item.productNameTelugu}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs border border-gray-200 text-gray-600 px-2 py-0.5 rounded-md">
                          {item.size}
                        </span>
                        <span className="text-xs text-gray-400">GST {item.gstRate}%</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <p className="font-bold text-brand-green text-sm">
                        ₹{lineTotal.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-gray-400">₹{item.price} × {item.quantity}</p>

                      {/* Qty controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQty(item.productId, item.size, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="w-7 h-7 rounded-full border border-red-100 text-red-400 flex items-center justify-center hover:bg-red-50 transition-colors ml-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="text-sm text-red-400 hover:text-red-600 transition-colors mt-2"
              >
                Clear all items
              </button>

              {/* Customer details form */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 mt-4">
                <h2 className="font-semibold text-gray-900 text-base mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-brand-green" />
                  Your Details (for invoice &amp; delivery)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Full Name', placeholder: 'Your full name', type: 'text', required: true },
                    { key: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', type: 'tel', required: true },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        {field.label} {field.required && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={order[field.key as keyof OrderDetails]}
                        onChange={(e) => setOrder((o) => ({ ...o, [field.key]: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      placeholder="Door No., Street, Area"
                      value={order.address}
                      onChange={(e) => setOrder((o) => ({ ...o, address: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={order.city}
                      onChange={(e) => setOrder((o) => ({ ...o, city: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">PIN Code</label>
                    <input
                      type="text"
                      placeholder="6-digit PIN"
                      value={order.pincode}
                      onChange={(e) => setOrder((o) => ({ ...o, pincode: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Special Instructions (optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any special packaging request or delivery instructions..."
                      value={order.notes}
                      onChange={(e) => setOrder((o) => ({ ...o, notes: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 sticky top-28">
                <h2 className="font-semibold text-gray-900 text-base mb-4">Order Summary</h2>
                <p className="text-xs text-gray-400 mb-4">Invoice No: {invoiceNo}</p>

                {/* Line items */}
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate mr-2">
                        {item.productName} ({item.size}) × {item.quantity}
                      </span>
                      <span className="font-medium shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal (excl. GST)</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GST</span>
                    <span>₹{gstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-2">
                    <span>Total</span>
                    <span className="text-brand-green">₹{totalWithGst.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BA58] text-white font-semibold py-3.5 rounded-full transition-colors text-sm"
                  >
                    <MessageCircle size={18} />
                    Order via WhatsApp
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-2.5 border border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-semibold py-3.5 rounded-full transition-colors text-sm"
                  >
                    <Printer size={18} />
                    Print / Save Invoice
                  </button>
                </div>

                {/* Trust note */}
                <div className="mt-5 flex items-start gap-2 p-3 bg-brand-cream rounded-xl">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    WhatsApp order sends your cart to our team. We&apos;ll confirm availability and arrange delivery.
                  </p>
                </div>

                {/* GSTIN */}
                <p className="text-[10px] text-gray-400 mt-4 text-center">
                  GSTIN: {GSTIN} | FSSAI: {FSSAI}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
