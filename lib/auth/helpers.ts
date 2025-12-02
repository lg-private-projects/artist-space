import { createClient } from '@/lib/supabase/server'
import { User, UserRole } from '@/types'

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) return null
  
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()
  
  return userData
}

export async function getUserRole(): Promise<UserRole | null> {
  const user = await getCurrentUser()
  return user?.role || null
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

export async function isAdmin(): Promise<boolean> {
  const role = await getUserRole()
  return role === 'admin'
}

export async function isArtist(): Promise<boolean> {
  const role = await getUserRole()
  return role === 'artist'
}

export async function requireAuth() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    throw new Error('Unauthorized')
  }
}

export async function requireRole(allowedRoles: UserRole[]) {
  const role = await getUserRole()
  if (!role || !allowedRoles.includes(role)) {
    throw new Error('Forbidden')
  }
}