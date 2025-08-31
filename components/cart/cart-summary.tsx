"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export function CartSummary() {
  const { items, getTotalPrice } = useCart()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 200 ? 0 : 15
  const total = subtotal + shipping

  if (items.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumo do Pedido</h3>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Frete</span>
          <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}</span>
        </div>
        {subtotal < 200 && (
          <p className="text-sm text-amber-600 dark:text-amber-400">Frete grátis em compras acima de R$ 200,00</p>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-6">
        <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      <Button asChild className="w-full">
        <Link href="/checkout">Finalizar Compra</Link>
      </Button>
    </div>
  )
}
