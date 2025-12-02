import { PlanType } from '@/types'

export const PLAN_LIMITS = {
  silver: {
    maxArtworks: 10,
    maxDailyStatus: 5,
    maxServices: 5,
    features: ['basic_profile'],
    landingSection: 'new_artists',
    displayName: 'Artistas Nuevos'
  },
  gold: {
    maxArtworks: 50,
    maxDailyStatus: 15,
    maxServices: 15,
    features: ['flash_sales', 'comments'],
    landingSection: 'relevant_artists',
    displayName: 'Artistas Relevantes'
  },
  premium: {
    maxArtworks: 999,
    maxDailyStatus: 20,
    maxServices: 20,
    features: ['flash_sales', 'coupons', 'reviews', 'comments', 'monthly_featured'],
    landingSection: 'top_artists',
    displayName: 'Artistas Top'
  }
} as const

export const PLAN_FEATURES = {
  silver: [
    'Perfil básico de artista',
    'Hasta 10 obras publicadas',
    'Hasta 5 actualizaciones diarias',
    'Hasta 5 servicios personalizados',
    'Aparece en sección "Artistas Nuevos"'
  ],
  gold: [
    'Todo lo de Silver',
    'Hasta 50 obras publicadas',
    'Hasta 15 actualizaciones diarias',
    'Hasta 15 servicios personalizados',
    'Ofertas flash para seguidores',
    'Comentarios en obras',
    'Aparece en sección "Artistas Relevantes"'
  ],
  premium: [
    'Todo lo de Gold',
    'Obras ilimitadas',
    'Hasta 20 actualizaciones diarias',
    'Hasta 20 servicios personalizados',
    'Cupones de descuento',
    'Reviews y calificaciones',
    'Posibilidad de destacado del mes',
    'Aparece en sección "Artistas Top"'
  ]
} as const

export function getPlanLimits(plan: PlanType) {
  return PLAN_LIMITS[plan]
}

export function canUseFeature(plan: PlanType, feature: string): boolean {
  const planFeatures = PLAN_LIMITS[plan].features
  return planFeatures.some(f => f === feature)
}