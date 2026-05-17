# Andhra Harvest Foods

An e-commerce storefront for traditional Andhra Pradesh food products — rice, millets, dals, spices, flours, and cooking essentials. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework, routing, SSR |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| lucide-react | Icons |
| React Context | Cart state management |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── globals.css         # Global styles
│   ├── about/              # About page
│   ├── bulk-orders/        # Bulk orders enquiry page
│   ├── cart/               # Cart & checkout page
│   ├── contact/            # Contact page
│   ├── exports/            # Export enquiries page
│   ├── quality/            # Quality assurance page
│   ├── products/
│   │   ├── page.tsx        # Products listing with filters
│   │   └── [slug]/page.tsx # Individual product detail page
│   └── api/products/
│       └── route.ts        # REST API: GET /api/products
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Site header with navigation
│   │   └── Footer.tsx      # Site footer
│   ├── sections/           # Full-width homepage sections
│   │   ├── Hero.tsx
│   │   ├── StatsSection.tsx
│   │   ├── CategorySection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── TrustSection.tsx
│   │   ├── WhyChooseUs.tsx
│   │   └── AboutSection.tsx
│   └── ui/                 # Reusable UI components
│       ├── ProductCard.tsx
│       ├── CategoryCard.tsx
│       ├── AddToCartButton.tsx
│       ├── SearchBar.tsx
│       ├── Badge.tsx
│       └── ImageWithFallback.tsx
│
├── context/
│   └── CartContext.tsx      # Cart state (add, remove, quantity, checkout)
│
├── data/
│   └── products.ts         # All product & category data (static)
│
├── lib/
│   └── utils.ts            # Utility helpers (cn, price formatting, etc.)
│
└── types/
    └── index.ts            # TypeScript types (Product, Category, CartItem, etc.)
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, stats, categories, featured products |
| `/products` | Full product catalog with search and category filter |
| `/products/[slug]` | Product detail page with variants and add-to-cart |
| `/cart` | Cart with quantity controls, GST breakdown, and checkout form |
| `/about` | Brand story and sourcing information |
| `/quality` | Quality standards and process |
| `/bulk-orders` | Bulk order enquiry form |
| `/exports` | Export enquiry page |
| `/contact` | Contact form and details |

---

## API

### `GET /api/products`

Returns products and categories. Supports optional query parameters:

| Param | Description | Example |
|---|---|---|
| `category` | Filter by category slug | `?category=rice-millets` |
| `q` | Search by name, Telugu name, description, or tags | `?q=turmeric` |

**Response shape:**
```json
{
  "products": [...],
  "total": 42,
  "categories": [...]
}
```

---

## Product Categories

| Category | Slug |
|---|---|
| Rice & Millets | `rice-millets` |
| Dals & Nuts | `dals-nuts` |
| Whole Spices | `whole-spices` |
| Spice Powders | `powders` |
| Flours | `flours` |
| Cooking Essentials | `cooking-essentials` |
| Beverages | `beverages` |

---

## Adding Products

All product data lives in [src/data/products.ts](src/data/products.ts). To add a new product, append an entry to the `products` array:

```ts
{
  id: 'your-product-id',
  name: 'Product Name',
  nameTelugu: 'తెలుగు పేరు',
  slug: 'your-product-slug',         // used in URL: /products/your-product-slug
  categorySlug: 'rice-millets',       // must match a category slug above
  description: 'Short description.',
  longDescription: 'Optional long description for the detail page.',
  image: '/images/products/your-image.jpg', // or null to show placeholder
  variants: [
    { size: '500 g', price: 80 },
    { size: '1 kg', price: 150 },
  ],
  features: ['100% Natural', 'No Preservatives'],
  tags: ['rice', 'healthy'],
  isFeatured: false,                  // true = appears on homepage
  gstRate: 5,                         // 0, 5, or 12
}
```

Place product images in `public/images/products/`. If `image` is `null`, the `ImageWithFallback` component renders a category-coloured placeholder automatically.

---

## Running Locally

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/yvinayt20/Andhra-Harvest-Foods.git
cd Andhra-Harvest-Foods

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint |

---

## Deploying to Vercel

1. Push the repo to GitHub (already done).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import this repo.
3. Vercel auto-detects Next.js — no configuration needed.
4. Click **Deploy**.

Vercel runs `npm install` and `npm run build` automatically. The `node_modules` folder is intentionally not committed.
