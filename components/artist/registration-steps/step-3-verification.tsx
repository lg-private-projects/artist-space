'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArtistRegistrationData } from '@/types/artist-registration'
import { Upload, X, CheckCircle } from 'lucide-react'

interface Step3Props {
  data: Partial<ArtistRegistrationData>
  onNext: (data: Partial<ArtistRegistrationData>) => void
  onBack: () => void
}

export function Step3Verification({ data, onNext, onBack }: Step3Props) {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [selfieVerification, setSelfieVerification] = useState<File | null>(null)
  const [idDocument, setIdDocument] = useState<File | null>(null)
  const [error, setError] = useState('')

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo no debe superar 5MB')
        return
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        setError('Solo se permiten imágenes')
        return
      }

      setter(file)
      setError('')
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // Validaciones
    if (!profilePhoto || !selfieVerification || !idDocument) {
      setError('Debes subir todos los documentos requeridos')
      return
    }

    onNext({
      profilePhoto,
      selfieVerification,
      idDocument
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Verificación de Identidad</h2>
        <p className="text-gray-600 mt-1">
          Necesitamos verificar tu identidad para proteger a todos los artistas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Foto de perfil */}
        <div>
          <Label>Foto de Perfil *</Label>
          <p className="text-sm text-gray-600 mb-2">
            Esta será tu foto pública en la plataforma
          </p>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            {!profilePhoto ? (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setProfilePhoto)}
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click para subir foto de perfil
                </p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG (max 5MB)</p>
              </label>
            ) : (
              <div className="space-y-2">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <p className="text-sm font-medium">{profilePhoto.name}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setProfilePhoto(null)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Selfie de verificación */}
        <div>
          <Label>Selfie de Verificación *</Label>
          <p className="text-sm text-gray-600 mb-2">
            Una selfie tuya sosteniendo tu documento de identidad
          </p>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            {!selfieVerification ? (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setSelfieVerification)}
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click para subir selfie con documento
                </p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG (max 5MB)</p>
              </label>
            ) : (
              <div className="space-y-2">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <p className="text-sm font-medium">{selfieVerification.name}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelfieVerification(null)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Documento de identidad */}
        <div>
          <Label>Documento de Identidad *</Label>
          <p className="text-sm text-gray-600 mb-2">
            Cédula de identidad, pasaporte o documento oficial
          </p>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            {!idDocument ? (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setIdDocument)}
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click para subir documento de identidad
                </p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG (max 5MB)</p>
              </label>
            ) : (
              <div className="space-y-2">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <p className="text-sm font-medium">{idDocument.name}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIdDocument(null)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded">
          <p className="text-sm text-blue-800">
            <strong>⚠️ Importante:</strong> Estos documentos serán revisados por nuestro equipo
            para verificar tu identidad. La información se maneja de forma confidencial y segura.
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