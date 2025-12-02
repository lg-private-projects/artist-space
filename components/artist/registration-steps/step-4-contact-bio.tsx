'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArtistRegistrationData } from '@/types/artist-registration'

interface Step4Props {
  data: Partial<ArtistRegistrationData>
  onNext: (data: Partial<ArtistRegistrationData>) => void
  onBack: () => void
}

export function Step4ContactBio({ data, onNext, onBack }: Step4Props) {
  const [bio, setBio] = useState(data.bio || '')
  const [whatsapp, setWhatsapp] = useState(data.whatsapp || '')
  const [websiteUrl, setWebsiteUrl] = useState(data.websiteUrl || '')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // Validaciones
    if (!bio || bio.length < 50) {
      setError('La biografía debe tener al menos 50 caracteres')
      return
    }

    if (bio.length > 500) {
      setError('La biografía no puede superar 500 caracteres')
      return
    }

    // Validar WhatsApp si se proporcionó
    if (whatsapp) {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/
      if (!phoneRegex.test(whatsapp.replace(/\s/g, ''))) {
        setError('Número de WhatsApp inválido. Usa formato internacional: +56912345678')
        return
      }
    }

    // Validar URL si se proporcionó
    if (websiteUrl) {
      try {
        new URL(websiteUrl)
      } catch {
        setError('URL de sitio web inválida')
        return
      }
    }

    onNext({
      bio,
      whatsapp: whatsapp || undefined,
      websiteUrl: websiteUrl || undefined
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Contacto y Biografía</h2>
        <p className="text-gray-600 mt-1">
          Cuéntanos sobre ti y cómo pueden contactarte
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <Label htmlFor="bio">Biografía *</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Cuéntanos sobre ti, tu trayectoria, tu estilo artístico..."
            rows={6}
            required
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">
            {bio.length}/500 caracteres (mínimo 50)
          </p>
        </div>

        <div>
          <Label htmlFor="whatsapp">WhatsApp (opcional)</Label>
          <Input
            id="whatsapp"
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+56912345678"
          />
          <p className="text-xs text-gray-500 mt-1">
            Formato internacional con código de país. Los visitantes podrán contactarte por aquí.
          </p>
        </div>

        <div>
          <Label htmlFor="websiteUrl">Sitio Web (opcional)</Label>
          <Input
            id="websiteUrl"
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://tuportfolio.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            Si tienes un portafolio o sitio web personal
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
          <p className="text-sm text-yellow-800">
            <strong>💡 Tip:</strong> Una buena biografía aumenta tus posibilidades de ser
            descubierto. Incluye tu experiencia, estilo y qué te hace único.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Atrás
          </Button>
          <Button type="submit">
            Siguiente
          </Button>
        </div>
      </form>
    </div>
  )
}