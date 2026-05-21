# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server (requires build first)
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**Next.js 14 App Router** e-commerce storefront for Andhra Pradesh food products. TypeScript strict mode throughout. Path alias `@/*` maps to `src/*`.

### Data layer

All product data lives in [src/data/products.ts](src/data/products.ts) as static in-memory arrays — there is no database. The `GET /api/products` route in [src/app/api/products/route.ts](src/app/api/products/route.ts) reads from this file and supports `?category=<slug>` and `?q=<search>` query params. To add or modify products, edit `products.ts` directly.

### State management

Two React Contexts wrap the entire app (see [src/app/layout.tsx](src/app/layout.tsx)):

- **CartContext** ([src/context/CartContext.tsx](src/context/CartContext.tsx)) — `useReducer`-based cart persisted to localStorage key `ahf_cart`. Exposes `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `isInCart`, `totalItems`, `subtotal`.
- **LanguageContext** ([src/context/LanguageContext.tsx](src/context/LanguageContext.tsx)) — 6 languages (English, Telugu, Hindi, Tamil, Kannada, Malayalam) with full UI translation strings. Persisted to localStorage key `ahf_lang`. Access via `useLanguage()` hook.

### Styling conventions

Custom Tailwind tokens defined in [tailwind.config.ts](tailwind.config.ts):
- Brand colors: `brand-green` (#1B4332), `brand-gold` (#B8860B), `brand-cream` (#FFFBF0)
- Each of the 7 product categories has its own color scheme (amber, green, orange, red, yellow, teal, stone)
- Category colors are resolved via `getCategoryColors(categorySlug)` in [src/lib/utils.ts](src/lib/utils.ts)
- Use `cn()` from `src/lib/utils.ts` (wraps `clsx` + `tailwind-merge`) for conditional classnames

### Types

All shared TypeScript types are in [src/types/index.ts](src/types/index.ts). Key types: `Product`, `Category`, `CartItem`, `CategoryColors`. Products have `variants: { size, price }[]` and a `gstRate` of 0, 5, or 12.

### Product categories (slugs)

`rice-millets`, `dals-nuts`, `whole-spices`, `powders`, `flours`, `cooking-essentials`, `beverages`

## Notable gaps

- No payment/checkout integration — the cart exists but has no Stripe or other payment flow
- No image assets bundled for most products — `ImageWithFallback` component handles missing images gracefully
