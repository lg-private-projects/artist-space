import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export default cloudinary

// Tipos para las transformaciones
export interface WatermarkConfig {
  opacity: number
  width: number
  gravity?: string
}

// Presets de marca de agua según plan
export const WATERMARK_PRESETS: Record<string, WatermarkConfig> = {
  premium: {
    opacity: 30,
    width: 350,
    gravity: 'center'
  },
  gold: {
    opacity: 35,
    width: 400,
    gravity: 'center'
  },
  silver: {
    opacity: 40,
    width: 450,
    gravity: 'center'
  }
}