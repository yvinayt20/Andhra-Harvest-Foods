'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export default function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  sizes,
}: Props) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={cn('bg-gray-100 flex items-center justify-center', className)}>
        <span className="text-gray-400 text-4xl">🌾</span>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        onError={() => setHasError(true)}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => setHasError(true)}
    />
  )
}
