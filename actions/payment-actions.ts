'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitPaymentProof(formData: FormData) {
  const supabase = await createClient()

  try {
    const proofFile = formData.get('proof') as File
    const subscriptionId = formData.get('subscription_id') as string
    const artistId = formData.get('artist_id') as string
    const plan = formData.get('plan') as string
    const billingPeriod = formData.get('billing_period') as string
    const amount = parseFloat(formData.get('amount') as string)
    const paymentMethod = formData.get('payment_method') as string
    const paymentReference = formData.get('payment_reference') as string
    const paymentDate = formData.get('payment_date') as string

    // 1. Subir comprobante a Storage
    const fileExt = proofFile.name.split('.').pop()
    const fileName = `${artistId}/payment-proof-${Date.now()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('artist-documents')
      .upload(fileName, proofFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return { error: 'Error al subir comprobante' }
    }

    // 2. Obtener URL del comprobante
    const { data: { publicUrl } } = supabase.storage
      .from('artist-documents')
      .getPublicUrl(fileName)

    // 3. Crear payment_request
    const { error: paymentError } = await supabase
      .from('payment_requests')
      .insert({
        subscription_id: subscriptionId,
        artist_id: artistId,
        plan_type: plan,
        billing_period: billingPeriod,
        amount: amount,
        currency: 'CLP',
        payment_method: paymentMethod,
        proof_of_payment_url: publicUrl,
        payment_reference: paymentReference || null,
        paid_at: paymentDate,
        status: 'awaiting_verification'
      })

    if (paymentError) {
      console.error('Payment request error:', paymentError)
      return { error: 'Error al registrar pago' }
    }

    // 4. Actualizar estado de suscripción
    await supabase
      .from('plan_subscriptions')
      .update({ status: 'pending_payment' })
      .eq('id', subscriptionId)

    return { success: true }

  } catch (error) {
    console.error('Submit proof error:', error)
    return { error: 'Error inesperado al procesar comprobante' }
  }
}