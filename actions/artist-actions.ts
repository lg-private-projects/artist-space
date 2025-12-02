'use server'

import { createClient } from '@/lib/supabase/server'
import { ArtistRegistrationData } from '@/types/artist-registration'

export async function registerArtist(data: ArtistRegistrationData) {
  const supabase = await createClient()

  try {
    // 1. Crear usuario en auth CON metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          role: 'artist' // ← Guardamos el rol aquí
        }
      }
    })

    if (authError) {
      return { error: authError.message }
    }

    if (!authData.user) {
      return { error: 'Error al crear usuario' }
    }

    const userId = authData.user.id

    // 2. Crear registro en tabla users
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email: data.email,
        role: 'artist'
      })

    if (userError) {
      console.error('Error creating user:', userError)
      return { error: 'Error al crear usuario' }
    }

    // 3. Subir archivos a Supabase Storage
    const profilePhotoUrl = data.profilePhoto 
      ? await uploadFile(supabase, data.profilePhoto, `${userId}/profile-photo`)
      : null

    const selfieUrl = data.selfieVerification
      ? await uploadFile(supabase, data.selfieVerification, `${userId}/selfie-verification`)
      : null

    const idDocumentUrl = data.idDocument
      ? await uploadFile(supabase, data.idDocument, `${userId}/id-document`)
      : null

    // 4. Crear perfil de artista
    const { error: artistError } = await supabase
      .from('artist_profiles')
      .insert({
        id: userId,
        status: 'pending',
        plan: data.selectedPlan,
        full_name: data.fullName,
        display_name: data.displayName,
        age: data.age,
        nationality: data.nationality,
        location: {
          country: data.country,
          city: data.city
        },
        bio: data.bio,
        whatsapp: data.whatsapp || null,
        website_url: data.websiteUrl || null,
        profile_photo_url: profilePhotoUrl,
        verification_selfie_url: selfieUrl,
        id_document_url: idDocumentUrl
      })

    if (artistError) {
      console.error('Error creating artist profile:', artistError)
      return { error: 'Error al crear perfil de artista' }
    }

    // 5. Crear suscripción pendiente
    const { error: subError } = await supabase
      .from('plan_subscriptions')
      .insert({
        artist_id: userId,
        plan_type: data.selectedPlan,
        billing_period: data.billingPeriod,
        status: 'pending_payment'
      })

    if (subError) {
      console.error('Error creating subscription:', subError)
      return { error: 'Error al crear suscripción' }
    }

    return { artistId: userId }

  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'Error inesperado durante el registro' }
  }
}

// Helper para subir archivos
async function uploadFile(
  supabase: any,
  file: File,
  path: string
): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${path}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('artist-documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('artist-documents')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error('File upload error:', error)
    return null
  }
}