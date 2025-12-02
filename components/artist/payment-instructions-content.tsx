'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { Copy, Check } from 'lucide-react'

interface PaymentInstructionsContentProps {
  artistId: string
  email: string
  plan: string
  billingPeriod: string
  amount: number
  subscriptionId: string
}

export function PaymentInstructionsContent({
  artistId,
  email,
  plan,
  billingPeriod,
  amount,
  subscriptionId
}: PaymentInstructionsContentProps) {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<'mercado_pago' | 'bank_transfer'>('bank_transfer')
  const [copied, setCopied] = useState<string | null>(null)

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">¡Registro Exitoso!</h1>
          <p className="text-gray-600 mt-2">
            Ahora completa tu pago para activar tu cuenta
          </p>
        </div>

        {/* Resumen del Plan */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Resumen de tu Plan</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan:</span>
              <Badge className="capitalize">{plan}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Período:</span>
              <span className="font-medium">
                {billingPeriod === 'monthly' ? 'Mensual' : 'Trimestral (3 meses)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{email}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total a pagar:</span>
              <span className="text-blue-600">{formatCurrency(amount, 'CLP')}</span>
            </div>
          </div>
        </Card>

        {/* Métodos de Pago */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Métodos de Pago</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setSelectedMethod('bank_transfer')}
              className={`p-4 border-2 rounded-lg transition ${
                selectedMethod === 'bank_transfer'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-semibold">Transferencia Bancaria</h3>
              <p className="text-sm text-gray-600">Proceso 24-48 horas</p>
            </button>

            <button
              onClick={() => setSelectedMethod('mercado_pago')}
              className={`p-4 border-2 rounded-lg transition ${
                selectedMethod === 'mercado_pago'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-semibold">Mercado Pago</h3>
              <p className="text-sm text-gray-600">Verificación rápida</p>
            </button>
          </div>

          {/* Transferencia Bancaria */}
          {selectedMethod === 'bank_transfer' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Datos para Transferencia</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Banco</p>
                    <p className="font-medium">Banco Estado</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Titular</p>
                    <p className="font-medium">Artist Space SpA</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Cuenta Corriente</p>
                    <p className="font-mono font-medium">12345678901</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard('12345678901', 'account')}
                  >
                    {copied === 'account' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">RUT</p>
                    <p className="font-mono font-medium">76.123.456-7</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard('76.123.456-7', 'rut')}
                  >
                    {copied === 'rut' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">pagos@artistspace.cl</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard('pagos@artistspace.cl', 'email')}
                  >
                    {copied === 'email' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Importante:</strong> Incluye tu email <strong>{email}</strong> en 
                  el concepto de la transferencia para identificar tu pago.
                </p>
              </div>
            </div>
          )}

          {/* Mercado Pago */}
          {selectedMethod === 'mercado_pago' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Pagar con Mercado Pago</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Alias de Mercado Pago</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-4 py-2 rounded border font-mono">
                      artist.space.pagos
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard('artist.space.pagos', 'mp-alias')}
                    >
                      {copied === 'mp-alias' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">O escanea el QR:</p>
                  <div className="bg-white p-4 rounded border inline-block">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500 text-sm">QR Code Aquí</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Importante:</strong> Incluye tu email <strong>{email}</strong> en 
                  la descripción del pago.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Siguiente Paso */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Siguiente Paso</h2>
          <ol className="space-y-3 mb-6">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <span>Realiza el pago usando los datos proporcionados</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <span>Guarda el comprobante de pago (captura de pantalla o PDF)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <span>Sube tu comprobante para verificación</span>
            </li>
          </ol>

          <Button 
            className="w-full" 
            size="lg"
            onClick={() => router.push(`/register-artist/upload-proof?subscription_id=${subscriptionId}&method=${selectedMethod}`)}
          >
            Subir Comprobante de Pago
          </Button>
        </Card>
      </div>
    </div>
  )
}