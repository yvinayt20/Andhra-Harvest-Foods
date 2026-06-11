'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, Users, BarChart2, Settings, LogOut, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function AdminPage() {
  const { user, loading, signOut, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login?redirect=/admin')
    if (!loading && user && !isAdmin) router.push('/')
  }, [user, loading, isAdmin, router])

  async function handleSignOut() {
    await signOut()
    router.push('/')
    router.refresh()
  }

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <div className="bg-brand-green text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={20} />
          <span className="font-bold text-lg">Admin Panel</span>
          <span className="text-white/60 text-xs ml-1">Andhra Harvest Foods</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/80">{user.email}</span>
          <button onClick={handleSignOut} className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors">
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-500 text-sm mb-8">Manage your store from here.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Products', value: '45', color: 'bg-brand-green' },
            { label: 'Categories', value: '8', color: 'bg-brand-gold' },
            { label: 'Orders (mock)', value: '—', color: 'bg-purple-500' },
            { label: 'Users (mock)', value: '—', color: 'bg-blue-500' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-card p-5">
              <div className={`w-8 h-8 rounded-lg ${s.color} mb-3`} />
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: <Package size={20} />, label: 'Products', desc: 'Edit prices & stock', href: '/admin/products' },
            { icon: <Users size={20} />, label: 'Customers', desc: 'Manage customer accounts', href: '#' },
            { icon: <BarChart2 size={20} />, label: 'Analytics', desc: 'Sales and traffic reports', href: '#' },
            { icon: <Settings size={20} />, label: 'Settings', desc: 'Store configuration', href: '#' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="bg-white rounded-2xl shadow-card p-6 flex items-start gap-4 hover:shadow-card-hover transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-green-50 flex items-center justify-center text-brand-green shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{item.label}</div>
                <div className="text-sm text-gray-400 mt-0.5">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
