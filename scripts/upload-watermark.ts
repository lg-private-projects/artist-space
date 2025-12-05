import cloudinary from '@/lib/cloudinary/server'

async function uploadWatermark() {
  try {
    // Sube tu logo (ajusta la ruta donde tengas tu logo)
    const result = await cloudinary.uploader.upload('./public/watermark-logo.png', {
      public_id: 'watermarks/artist-space-logo',
      folder: 'watermarks',
      resource_type: 'image'
    })

    console.log('✅ Watermark uploaded successfully!')
    console.log('Public ID:', result.public_id)
    console.log('URL:', result.secure_url)
  } catch (error) {
    console.error('❌ Error uploading watermark:', error)
  }
}

uploadWatermark()