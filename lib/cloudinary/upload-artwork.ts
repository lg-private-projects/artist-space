import cloudinary, { WATERMARK_PRESETS } from './server'
import { PlanType } from '@/types'

interface UploadArtworkResult {
  originalUrl: string
  fullsizeUrl: string
  displayUrl: string
  thumbnailUrl: string
  publicId: string
}

export async function uploadArtworkWithWatermark(
  file: File | Buffer,
  artistId: string,
  plan: PlanType
): Promise<UploadArtworkResult> {
  try {
    // Convertir File a base64 si es necesario
    let uploadSource: string

    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      uploadSource = `data:${file.type};base64,${buffer.toString('base64')}`
    } else {
      uploadSource = `data:image/jpeg;base64,${file.toString('base64')}`
    }

    // 1. Subir imagen original (SIN marca de agua) a carpeta privada
    const originalUpload = await cloudinary.uploader.upload(uploadSource, {
      folder: `artworks/originals/${artistId}`,
      resource_type: 'image',
      type: 'private' // ⚠️ Importante: privado
    })

    const publicId = originalUpload.public_id

    // 2. Obtener configuración de marca de agua según plan
    const watermarkConfig = WATERMARK_PRESETS[plan]

    // 3. Generar URLs con diferentes tamaños y marca de agua
    // NOTA: Por ahora sin marca de agua porque aún no tienes el logo
    // Cuando lo tengas, agregaremos el overlay

    const fullsizeUrl = cloudinary.url(publicId, {
      transformation: [
        { width: 2000, crop: 'limit', quality: 'auto' },
        // { overlay: 'watermarks:artist-space-logo', ...watermarkConfig } // ← Activar cuando tengas logo
      ]
    })

    const displayUrl = cloudinary.url(publicId, {
      transformation: [
        { width: 1200, crop: 'limit', quality: 'auto' },
        // { overlay: 'watermarks:artist-space-logo', ...watermarkConfig }
      ]
    })

    const thumbnailUrl = cloudinary.url(publicId, {
      transformation: [
        { width: 400, height: 400, crop: 'fill', quality: 'auto', gravity: 'auto' },
        // { overlay: 'watermarks:artist-space-logo', opacity: 50, width: 100, gravity: 'south_east' }
      ]
    })

    return {
      originalUrl: originalUpload.secure_url, // URL privada
      fullsizeUrl,
      displayUrl,
      thumbnailUrl,
      publicId
    }

  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw new Error('Error al subir imagen')
  }
}

// Helper para borrar imágenes
export async function deleteArtwork(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
  }
}