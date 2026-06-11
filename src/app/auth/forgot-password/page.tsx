'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Loader2, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <Image src="/images/Logo.png" alt="Andhra Harvest Foods" width={64} height={64} className="rounded-full" />
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-brand-green font-serif">Reset password</h1>
          <p className="text-sm text-gray-500 mt-1">We&apos;ll send you a reset link</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">📬</div>
              <p className="font-semibold text-brand-green">Check your email</p>
              <p className="text-sm text-gray-500 mt-1">Password reset link sent to <strong>{email}</strong></p>
              <Link href="/auth/login" className="mt-6 inline-flex items-center gap-1.5 text-sm text-brand-green hover:underline font-medium">
                <ArrowLeft size={14} /> Back to login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{error}</div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green"
                    />
                  </div>
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-brand-green text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-green-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Send Reset Link
                </button>
              </form>
              <Link href="/auth/login" className="mt-5 flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-brand-green transition-colors">
                <ArrowLeft size={14} /> Back to login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
