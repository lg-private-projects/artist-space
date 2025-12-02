import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { UploadProofForm } from '@/components/artist/upload-proof-form'

interface PageProps {
  searchParams: {
    subscription_id?: string
    method?: string
  }
}

export default async function UploadProofPage({ searchParams }: PageProps) {
  const subscriptionId = searchParams.subscription_id
  const method = searchParams.method as 'mercado_pago' | 'bank_transfer' | undefined

  if (!subscriptionId || !method) {
    redirect('/register-artist')
  }

  const supabase = await createClient()

  // Obtener datos de la suscripción
  const { data: subscription } = await supabase
    .from('plan_subscriptions')
    .select(`
      *,
      artist_profiles!inner(
        display_name,
        users!inner(email)
      )
    `)
    .eq('id', subscriptionId)
    .single()

  const { data: pricing } = await supabase
    .from('plan_pricing')
    .select('*')
    .eq('plan_type', subscription?.plan_type)
    .single()

  if (!subscription || !pricing) {
    redirect('/register-artist')
  }

  const amount = subscription.billing_period === 'monthly' 
    ? pricing.monthly_price 
    : pricing.quarterly_price

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Subir Comprobante de Pago</h1>
          <p className="text-gray-600 mt-2">
            Sube tu comprobante para que podamos verificar tu pago
          </p>
        </div>

        <UploadProofForm
          subscriptionId={subscriptionId}
          artistId={subscription.artist_id}
          email={subscription.artist_profiles.users.email}
          plan={subscription.plan_type}
          billingPeriod={subscription.billing_period}
          amount={amount}
          paymentMethod={method}
        />
      </div>
    </div>
  )
}