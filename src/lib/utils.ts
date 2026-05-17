import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CategoryColors } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const categoryColorMap: Record<string, CategoryColors> = {
  'rice-millets': {
    gradient: 'from-amber-50 to-amber-100',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-200',
    badgeBg: 'bg-amber-100 text-amber-800',
    placeholderFrom: 'from-amber-100',
    placeholderTo: 'to-amber-200',
    accentBg: 'bg-amber-500',
  },
  'dals-nuts': {
    gradient: 'from-green-50 to-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    badgeBg: 'bg-green-100 text-green-800',
    placeholderFrom: 'from-green-100',
    placeholderTo: 'to-green-200',
    accentBg: 'bg-green-500',
  },
  'whole-spices': {
    gradient: 'from-orange-50 to-orange-100',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-200',
    badgeBg: 'bg-orange-100 text-orange-800',
    placeholderFrom: 'from-orange-100',
    placeholderTo: 'to-orange-200',
    accentBg: 'bg-orange-500',
  },
  'powders': {
    gradient: 'from-red-50 to-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    badgeBg: 'bg-red-100 text-red-800',
    placeholderFrom: 'from-red-100',
    placeholderTo: 'to-red-200',
    accentBg: 'bg-red-500',
  },
  'flours': {
    gradient: 'from-yellow-50 to-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
    badgeBg: 'bg-yellow-100 text-yellow-800',
    placeholderFrom: 'from-yellow-100',
    placeholderTo: 'to-yellow-200',
    accentBg: 'bg-yellow-500',
  },
  'cooking-essentials': {
    gradient: 'from-teal-50 to-teal-100',
    textColor: 'text-teal-800',
    borderColor: 'border-teal-200',
    badgeBg: 'bg-teal-100 text-teal-800',
    placeholderFrom: 'from-teal-100',
    placeholderTo: 'to-teal-200',
    accentBg: 'bg-teal-500',
  },
  'beverages': {
    gradient: 'from-stone-50 to-stone-100',
    textColor: 'text-stone-800',
    borderColor: 'border-stone-200',
    badgeBg: 'bg-stone-100 text-stone-700',
    placeholderFrom: 'from-stone-100',
    placeholderTo: 'to-stone-200',
    accentBg: 'bg-stone-500',
  },
}

export function getCategoryColors(slug: string): CategoryColors {
  return categoryColorMap[slug] ?? categoryColorMap['rice-millets']
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}
