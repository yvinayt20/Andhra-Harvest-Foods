'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, ShoppingBag, LogOut, Settings, ChevronRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function AccountPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login?redirect=/account')
  }, [user, loading, router])

  async function handleSignOut() {
    await signOut()
    router.push('/')
    router.refresh()
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const name = user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Customer'
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-brand-cream py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-card p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center text-white text-xl font-bold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-brand-green text-lg truncate">{name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-2xl shadow-card divide-y divide-gray-50">
          <AccountRow icon={<User size={18} />} label="My Profile" href="/account/profile" />
          <AccountRow icon={<ShoppingBag size={18} />} label="My Orders" href="/account/orders" />
          <AccountRow icon={<Settings size={18} />} label="Account Settings" href="/account/settings" />
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl shadow-card text-red-500 hover:bg-red-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </div>
          <ChevronRight size={16} className="text-gray-300" />
        </button>

        <p className="text-center text-xs text-gray-400">
          Member since {new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </div>
  )
}

function AccountRow({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-5 py-4 hover:bg-brand-green-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
    >
      <div className="flex items-center gap-3 text-gray-700">
        <span className="text-brand-green">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </Link>
  )
}
