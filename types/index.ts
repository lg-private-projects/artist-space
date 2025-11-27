export type UserRole = 'visitor' | 'artist' | 'admin'

export type ArtistStatus = 'pending' | 'approved' | 'rejected' | 'suspended'

export type PlanType = 'silver' | 'gold' | 'premium'

export type BillingPeriod = 'monthly' | 'quarterly'

export type SubscriptionStatus = 'active' | 'pending_payment' | 'expired' | 'cancelled'

export type PaymentMethod = 'mercado_pago' | 'bank_transfer'

export type PaymentStatus = 'pending' | 'awaiting_verification' | 'verified' | 'rejected'

export type Availability = 'available' | 'away' | 'vacation'

export interface User {
  id: string
  email: string
  role: UserRole
  created_at: string
}

export interface ArtistProfile {
  id: string
  status: ArtistStatus
  plan: PlanType
  plan_expires_at: string | null
  full_name: string
  display_name: string
  bio: string | null
  profile_photo_url: string | null
  nationality: string
  age: number
  location: {
    country: string
    city: string
    coordinates?: { lat: number; lng: number }
  }
  whatsapp: string | null
  website_url: string | null
  availability: Availability
  total_artworks: number
  total_followers: number
  total_likes: number
  profile_views: number
  created_at: string
}

export interface Artwork {
  id: string
  artist_id: string
  title: string
  description: string | null
  original_url: string // privada
  fullsize_url: string // con marca de agua
  display_url: string // con marca de agua
  thumbnail_url: string // con marca de agua
  price: number | null
  currency: string
  is_on_sale: boolean
  sale_price: number | null
  is_highlighted: boolean
  views_count: number
  likes_count: number
  created_at: string
}

// Más tipos según necesitemos...