'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react'
import type { CartItem } from '@/types'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; productId: string; size: string }
  | { type: 'UPDATE_QTY'; productId: string; size: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items }
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.productId === action.item.productId && i.size === action.item.size,
      )
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.item.productId && i.size === action.item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        }
      }
      return { items: [...state.items, { ...action.item, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (i) => !(i.productId === action.productId && i.size === action.size),
        ),
      }
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.productId === action.productId && i.size === action.size),
          ),
        }
      }
      return {
        items: state.items.map((i) =>
          i.productId === action.productId && i.size === action.size
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      }
    case 'CLEAR_CART':
      return { items: [] }
  }
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string, size: string) => void
  updateQty: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string, size: string) => boolean
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'ahf_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[]
        dispatch({ type: 'HYDRATE', items: parsed })
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // ignore
    }
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const value: CartContextValue = {
    items: state.items,
    totalItems,
    subtotal,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', item: { ...item, quantity: 1 } }),
    removeItem: (productId, size) => dispatch({ type: 'REMOVE_ITEM', productId, size }),
    updateQty: (productId, size, quantity) =>
      dispatch({ type: 'UPDATE_QTY', productId, size, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    isInCart: (productId, size) =>
      state.items.some((i) => i.productId === productId && i.size === size),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
