'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Upload, X, CheckCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { submitPaymentProof } from '@/actions/payment-actions'

interface UploadProofFormProps {
  subscriptionId: string
  artistId: string
  email: string
  plan: string
  billingPeriod: string
  amount: number
  paymentMethod: 'mercado_pago' | 'bank_transfer'
}

export function UploadProofForm({
  subscriptionId,
  artistId,
  email,
  plan,
  billingPeriod,
  amount,
  paymentMethod
}: UploadProofFormProps) {
  const router = useRouter()
  const [proofImage, setProofImage] = useState<File | null>(null)
  const [paymentReference, setPaymentReference] = useState('')
  const [paymentDate, setPaymentDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo no debe superar 5MB')
        return
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        setError('Solo se permiten imágenes')
        return
      }

      setProofImage(file)
      setError('')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!proofImage) {
      setError('Debes subir un comprobante')
      setLoading(false)
      return
    }

    if (!paymentDate) {
      setError('Debes indicar la fecha del pago')
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('proof', proofImage)
    formData.append('subscription_id', subscriptionId)
    formData.append('artist_id', artistId)
    formData.append('plan', plan)
    formData.append('billing_period', billingPeriod)
    formData.append('amount', amount.toString())
    formData.append('payment_method', paymentMethod)
    formData.append('payment_reference', paymentReference)
    formData.append('payment_date', paymentDate)

    const result = await submitPaymentProof(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push('/register-artist/pending-verification')
    }
  }

  return (
    <Card className="p-6">
      {/* Resumen */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Resumen del Pago</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Plan:</span>
            <Badge className="capitalize">{plan}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Período:</span>
            <span>{billingPeriod === 'monthly' ? 'Mensual' : 'Trimestral'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Método:</span>
            <span>{paymentMethod === 'mercado_pago' ? 'Mercado Pago' : 'Transferencia'}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total:</span>
            <span className="text-blue-600">{formatCurrency(amount, 'CLP')}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Upload de Comprobante */}
        <div>
          <Label>Comprobante de Pago *</Label>
          <p className="text-sm text-gray-600 mb-2">
            Captura de pantalla o PDF del comprobante
          </p>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            {!proofImage ? (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click para subir comprobante
                </p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG (max 5MB)</p>
              </label>
            ) : (
              <div className="space-y-2">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <p className="text-sm font-medium">{proofImage.name}</p>
                <p className="text-xs text-gray-500">
                  {(proofImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setProofImage(null)}
                  disabled={loading}
                >
                  <X className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Número de Referencia */}
        <div>
          <Label htmlFor="reference">
            Número de Referencia / Transacción {paymentMethod === 'bank_transfer' && '(opcional)'}
          </Label>
          <Input
            id="reference"
            type="text"
            value={paymentReference}
            onChange={(e) => setPaymentReference(e.target.value)}
            placeholder={
              paymentMethod === 'mercado_pago' 
                ? 'Ej: MP12345678' 
                : 'Número de operación (opcional)'
            }
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Ayuda a identificar tu pago más rápido
          </p>
        </div>

        {/* Fecha de Pago */}
        <div>
          <Label htmlFor="date">Fecha del Pago *</Label>
          <Input
            id="date"
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            required
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            La fecha que aparece en tu comprobante
          </p>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded">
          <p className="text-sm text-blue-800">
            <strong>📋 Importante:</strong> Verificaremos tu comprobante en las próximas 
            24-48 horas. Recibirás un email a <strong>{email}</strong> cuando tu cuenta 
            sea activada.
          </p>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full" size="lg" disabled={loading || !proofImage || !paymentDate}>
          {loading ? 'Enviando...' : 'Enviar Comprobante'}
        </Button>
      </form>
    </Card>
  )
}