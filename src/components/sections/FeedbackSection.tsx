'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, Send, Loader2, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

type FeedbackRow = {
  id: string
  user_id: string
  user_name: string | null
  rating: number
  comment: string | null
  created_at: string
}

export default function FeedbackSection({ productId }: { productId: string }) {
  const supabase = createClient()
  const { user } = useAuth()

  const [feedbacks, setFeedbacks] = useState<FeedbackRow[]>([])
  const [loadingFeedback, setLoadingFeedback] = useState(true)
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [hasReviewed, setHasReviewed] = useState(false)

  const loadFeedback = useCallback(async () => {
    setLoadingFeedback(true)
    const { data } = await supabase
      .from('feedback')
      .select('id, user_id, user_name, rating, comment, created_at')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
    setFeedbacks(data ?? [])
    if (user && data) {
      setHasReviewed(data.some((f) => f.user_id === user.id))
    }
    setLoadingFeedback(false)
  }, [supabase, productId, user])

  useEffect(() => { loadFeedback() }, [loadFeedback])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) { setError('Please select a star rating.'); return }
    setError('')
    setSubmitting(true)

    const userName = user?.user_metadata?.full_name ?? user?.email?.split('@')[0] ?? 'Customer'

    const { error: err } = await supabase.from('feedback').insert({
      product_id: productId,
      user_id: user!.id,
      user_name: userName,
      rating,
      comment: comment.trim() || null,
    })

    setSubmitting(false)
    if (err) { setError(err.message); return }
    setRating(0)
    setComment('')
    setHasReviewed(true)
    loadFeedback()
  }

  async function handleDelete(feedbackId: string) {
    await supabase.from('feedback').delete().eq('id', feedbackId)
    loadFeedback()
  }

  const avgRating = feedbacks.length
    ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
    : 0

  return (
    <div className="mt-16">
      <div className="flex items-center gap-4 mb-7">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Customer Reviews</h2>
        {feedbacks.length > 0 && (
          <div className="flex items-center gap-1.5">
            <StarDisplay rating={avgRating} />
            <span className="text-sm text-gray-500">({feedbacks.length})</span>
          </div>
        )}
      </div>

      {/* Submit form */}
      {user ? (
        hasReviewed ? (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-8 text-sm text-green-700 font-medium">
            You&apos;ve already reviewed this product. Thank you!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-6 mb-8">
            <p className="font-semibold text-gray-800 mb-4">Write a review</p>

            {/* Star picker */}
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(s)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={`transition-colors ${
                      s <= (hovered || rating)
                        ? 'fill-brand-gold text-brand-gold'
                        : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                </span>
              )}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience (optional)..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green resize-none"
            />

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-3 flex items-center gap-2 bg-brand-green text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-green-light transition-colors disabled:opacity-60"
            >
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              Submit Review
            </button>
          </form>
        )
      ) : (
        <div className="bg-brand-cream border border-gray-100 rounded-2xl p-5 mb-8 text-sm text-gray-600">
          <Link href="/auth/login" className="text-brand-green font-semibold hover:underline">Sign in</Link>
          {' '}to leave a review.
        </div>
      )}

      {/* Feedback list */}
      {loadingFeedback ? (
        <div className="flex justify-center py-8">
          <Loader2 size={22} className="animate-spin text-gray-300" />
        </div>
      ) : feedbacks.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((f) => (
            <div key={f.id} className="bg-white rounded-2xl shadow-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {(f.user_name ?? 'U')[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{f.user_name ?? 'Customer'}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(f.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StarDisplay rating={f.rating} />
                  {user && user.id === f.user_id && (
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors ml-1"
                      aria-label="Delete review"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
              {f.comment && (
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={s <= Math.round(rating) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  )
}
