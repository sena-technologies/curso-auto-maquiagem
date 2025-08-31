"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export function CartItems() {
  const { items, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Seu carrinho está vazio</p>
        <p className="text-gray-400 dark:text-gray-500 mt-2">Adicione alguns produtos para continuar</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded-md" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
            <p className="text-amber-600 dark:text-amber-400 font-medium">R$ {item.price.toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-right">
            <p className="font-semibold text-gray-900 dark:text-white">R$ {(item.price * item.quantity).toFixed(2)}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 mt-1"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
