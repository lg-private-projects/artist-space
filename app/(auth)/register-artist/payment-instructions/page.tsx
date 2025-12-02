import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PaymentInstructionsContent } from '@/components/artist/payment-instructions-content'

interface PageProps {
  searchParams: {
    artist_id?: string
  }
}

export default async function PaymentInstructionsPage({ searchParams }: PageProps) {
  const artistId = searchParams.artist_id

  if (!artistId) {
    redirect('/register-artist')
  }

  const supabase = await createClient()

  // Obtener datos del artista y suscripción
  const { data: artist } = await supabase
    .from('artist_profiles')
    .select('*, users!inner(email)')
    .eq('id', artistId)
    .single()

  const { data: subscription } = await supabase
    .from('plan_subscriptions')
    .select('*')
    .eq('artist_id', artistId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const { data: pricing } = await supabase
    .from('plan_pricing')
    .select('*')
    .eq('plan_type', subscription?.plan_type)
    .single()

  if (!artist || !subscription || !pricing) {
    redirect('/register-artist')
  }

  const amount = subscription.billing_period === 'monthly' 
    ? pricing.monthly_price 
    : pricing.quarterly_price

  return (
    <PaymentInstructionsContent
      artistId={artistId}
      email={artist.users.email}
      plan={subscription.plan_type}
      billingPeriod={subscription.billing_period}
      amount={amount}
      subscriptionId={subscription.id}
    />
  )
}