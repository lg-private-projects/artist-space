'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArtistRegistrationData } from '@/types/artist-registration'
import { PlanType, BillingPeriod } from '@/types'
import { Check } from 'lucide-react'
import { PLAN_FEATURES } from '@/config/plans'
import { formatCurrency } from '@/lib/utils'
import { registerArtist } from '@/actions/artist-actions'

interface Step5Props {
  data: Partial<ArtistRegistrationData>
  onBack: () => void
  onComplete: (data: Partial<ArtistRegistrationData>) => void
}

interface PlanPricing {
  monthly_price: number
  quarterly_price: number
  quarterly_discount_percentage: number
}

const PLAN_PRICING: Record<PlanType, PlanPricing> = {
  silver: {
    monthly_price: 80000,
    quarterly_price: 200000,
    quarterly_discount_percentage: 17
  },
  gold: {
    monthly_price: 150000,
    quarterly_price: 350000,
    quarterly_discount_percentage: 22
  },
  premium: {
    monthly_price: 300000,
    quarterly_price: 600000,
    quarterly_discount_percentage: 33
  }
}

export function Step5Plan({ data, onBack, onComplete }: Step5Props) {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(data.selectedPlan || 'silver')
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(data.billingPeriod || 'monthly')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedPrice = PLAN_PRICING[selectedPlan][
    billingPeriod === 'monthly' ? 'monthly_price' : 'quarterly_price'
  ]

  const monthlySavings = billingPeriod === 'quarterly'
    ? (PLAN_PRICING[selectedPlan].monthly_price * 3) - PLAN_PRICING[selectedPlan].quarterly_price
    : 0

  async function handleComplete() {
    setLoading(true)
    setError('')

    // Actualizar datos finales
    onComplete({ selectedPlan, billingPeriod })

    // Registrar artista
    const finalData = { ...data, selectedPlan, billingPeriod } as ArtistRegistrationData

    const result = await registerArtist(finalData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      // Redirigir a página de instrucciones de pago
      router.push(`/register-artist/payment-instructions?artist_id=${result.artistId}`)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Selecciona tu Plan</h2>
        <p className="text-gray-600 mt-1">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Toggle Mensual/Trimestral */}
      <div className="flex justify-center gap-2 mb-8">
        <Button
          type="button"
          variant={billingPeriod === 'monthly' ? 'default' : 'outline'}
          onClick={() => setBillingPeriod('monthly')}
        >
          Mensual
        </Button>
        <Button
          type="button"
          variant={billingPeriod === 'quarterly' ? 'default' : 'outline'}
          onClick={() => setBillingPeriod('quarterly')}
        >
          Trimestral
          <Badge className="ml-2" variant="secondary">
            Ahorra hasta 33%
          </Badge>
        </Button>
      </div>

      {/* Cards de Planes */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {(['silver', 'gold', 'premium'] as PlanType[]).map((plan) => {
          const pricing = PLAN_PRICING[plan]
          const price = billingPeriod === 'monthly' ? pricing.monthly_price : pricing.quarterly_price
          const isSelected = selectedPlan === plan
          const isPopular = plan === 'gold'

          return (
            <Card
              key={plan}
              className={`p-6 cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-500 border-2 shadow-lg'
                  : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="text-center mb-4">
                {isPopular && (
                  <Badge className="mb-2">Más Popular</Badge>
                )}
                <h3 className="text-xl font-bold capitalize">{plan}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    {formatCurrency(price, 'CLP')}
                  </span>
                  <span className="text-gray-600 text-sm">
                    /{billingPeriod === 'monthly' ? 'mes' : '3 meses'}
                  </span>
                </div>
                {billingPeriod === 'quarterly' && (
                  <p className="text-sm text-green-600 mt-2">
                    Ahorras {formatCurrency((pricing.monthly_price * 3) - pricing.quarterly_price, 'CLP')}
                  </p>
                )}
              </div>

              <ul className="space-y-2 mb-4">
                {PLAN_FEATURES[plan].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {isSelected && (
                <div className="text-center">
                  <Badge variant="default" className="w-full justify-center py-2">
                    Seleccionado
                  </Badge>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Resumen */}
      <div className="bg-gray-50 border rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-2">Resumen de tu selección:</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Plan:</span>
            <span className="font-semibold capitalize">{selectedPlan}</span>
          </div>
          <div className="flex justify-between">
            <span>Período:</span>
            <span className="font-semibold">
              {billingPeriod === 'monthly' ? 'Mensual' : 'Trimestral (3 meses)'}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total a pagar:</span>
            <span className="text-blue-600">
              {formatCurrency(selectedPrice, 'CLP')}
            </span>
          </div>
          {monthlySavings > 0 && (
            <p className="text-sm text-green-600 text-right">
              ✓ Ahorras {formatCurrency(monthlySavings, 'CLP')}
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
        <p className="text-sm text-blue-800">
          <strong>Siguiente paso:</strong> Te mostraremos las instrucciones de pago.
          Una vez que subas tu comprobante, revisaremos tu solicitud en 24-48 horas.
        </p>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={loading}>
          Atrás
        </Button>
        <Button onClick={handleComplete} disabled={loading}>
          {loading ? 'Procesando...' : 'Continuar al Pago'}
        </Button>
      </div>
    </div>
  )
}