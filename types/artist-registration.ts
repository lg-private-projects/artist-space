export interface ArtistRegistrationData {
  // Step 1: Cuenta
  email: string
  password: string
  confirmPassword: string

  // Step 2: Datos personales
  fullName: string
  displayName: string
  age: number
  nationality: string
  country: string
  city: string

  // Step 3: Verificación
  profilePhoto?: File
  selfieVerification?: File
  idDocument?: File

  // Step 4: Contacto y Bio
  bio: string
  whatsapp?: string
  websiteUrl?: string

  // Step 5: Plan
  selectedPlan: 'silver' | 'gold' | 'premium'
  billingPeriod: 'monthly' | 'quarterly'
}

export type RegistrationStep = 1 | 2 | 3 | 4 | 5