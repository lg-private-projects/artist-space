'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signUp(email: string, password: string, name?: string) {
  const supabase = await createClient()

  // 1. Crear usuario en auth CON metadata
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'visitor' // ← Guardamos el rol aquí
      }
    }
  })

  if (authError) {
    console.error('Auth error:', authError)
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'Error al crear usuario' }
  }

  console.log('User created in auth:', authData.user.id)

  // 2. Crear registro en tabla users
  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      id: authData.user.id,
      email: email,
      role: 'visitor'
    })
    .select()

  if (userError) {
    console.error('User insert error:', userError)
    return { error: `Error al crear perfil: ${userError.message}` }
  }

  console.log('User created in public.users:', userData)

  // 3. Crear perfil de visitante si se proporcionó nombre
  if (name) {
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        name: name
      })

    if (profileError) {
      console.error('Profile error:', profileError)
    }
  }

  return { data: authData }
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { data }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}