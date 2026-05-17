import { NextResponse } from 'next/server'
import { products, categories } from '@/data/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const q = searchParams.get('q')?.toLowerCase()

  let result = [...products]

  if (category) {
    result = result.filter((p) => p.categorySlug === category)
  }

  if (q) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameTelugu.includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)),
    )
  }

  return NextResponse.json({
    products: result,
    total: result.length,
    categories,
  })
}
