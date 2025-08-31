"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function CheckoutForm() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
    paymentMethod: "credit-card",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock checkout process
    alert("Pedido realizado com sucesso! (Demo)")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informações de Contato</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>
        </div>
      </div>

      <Separator />

      {/* Shipping Address */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Endereço de Entrega</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Nome</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Endereço</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="zipCode">CEP</Label>
            <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="state">Estado</Label>
            <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Forma de Pagamento</h3>
        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit-card" id="credit-card" />
            <Label htmlFor="credit-card">Cartão de Crédito</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pix" id="pix" />
            <Label htmlFor="pix">PIX</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="boleto" id="boleto" />
            <Label htmlFor="boleto">Boleto Bancário</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Finalizar Pedido
      </Button>
    </form>
  )
}
