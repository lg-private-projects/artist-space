'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArtistRegistrationData } from '@/types/artist-registration'

interface Step2Props {
  data: Partial<ArtistRegistrationData>
  onNext: (data: Partial<ArtistRegistrationData>) => void
  onBack: () => void
}

export function Step2PersonalInfo({ data, onNext, onBack }: Step2Props) {
  const [fullName, setFullName] = useState(data.fullName || '')
  const [displayName, setDisplayName] = useState(data.displayName || '')
  const [age, setAge] = useState(data.age?.toString() || '')
  const [nationality, setNationality] = useState(data.nationality || '')
  const [country, setCountry] = useState(data.country || 'Chile')
  const [city, setCity] = useState(data.city || '')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // Validaciones
    if (!fullName || !displayName || !age || !nationality || !country || !city) {
      setError('Todos los campos son obligatorios')
      return
    }

    const ageNum = parseInt(age)
    if (isNaN(ageNum) || ageNum < 18) {
      setError('Debes ser mayor de 18 años')
      return
    }

    if (ageNum > 120) {
      setError('Edad inválida')
      return
    }

    onNext({
      fullName,
      displayName,
      age: ageNum,
      nationality,
      country,
      city
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Datos Personales</h2>
        <p className="text-gray-600 mt-1">
          Información básica sobre ti como artista
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <Label htmlFor="fullName">Nombre Completo *</Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Tu nombre completo"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Tal como aparece en tu identificación
          </p>
        </div>

        <div>
          <Label htmlFor="displayName">Nombre de Artista *</Label>
          <Input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Cómo quieres que te conozcan"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Este será tu nombre público en la plataforma
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Edad *</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="18+"
              min="18"
              max="120"
              required
            />
          </div>

          <div>
            <Label htmlFor="nationality">Nacionalidad *</Label>
            <Input
              id="nationality"
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="Ej: Chilena"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country">País *</Label>
            <Input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Chile"
              required
            />
          </div>

          <div>
            <Label htmlFor="city">Ciudad *</Label>
            <Input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Santiago"
              required
            />
          </div>
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