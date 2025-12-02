import { ArtistRegistrationWizard } from '@/components/artist/registration-wizard'
import Link from 'next/link'

export default function RegisterArtistPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Registro de Artista</h1>
          <p className="text-gray-600 mt-2">
            Completa el proceso de verificación para unirte a nuestra comunidad
          </p>
        </div>

        <ArtistRegistrationWizard />

        <div className="text-center mt-6">
          <Link href="/login" className="text-sm text-blue-600 hover:underline">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}