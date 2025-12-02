'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArtistRegistrationData } from '@/types/artist-registration'

interface Step1Props {
  data: Partial<ArtistRegistrationData>
  onNext: (data: Partial<ArtistRegistrationData>) => void
}

export function Step1Account({ data, onNext }: Step1Props) {
  const [email, setEmail] = useState(data.email || '')
  const [password, setPassword] = useState(data.password || '')
  const [confirmPassword, setConfirmPassword] = useState(data.confirmPassword || '')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // Validaciones
    if (!email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Email inválido')
      return
    }

    onNext({ email, password, confirmPassword })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Crear Cuenta</h2>
        <p className="text-gray-600 mt-1">
          Comienza creando tu cuenta de artista
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Este será tu email de acceso a la plataforma
          </p>
        </div>

        <div>
          <Label htmlFor="password">Contraseña *</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite tu contraseña"
            required
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">
            Siguiente
          </Button>
        </div>
      </form>
    </div>
  )
}