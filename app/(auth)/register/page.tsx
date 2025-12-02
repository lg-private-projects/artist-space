import { RegisterForm } from '@/components/auth/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Crear Cuenta</h1>
          <p className="text-gray-600 mt-2">Regístrate como visitante</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <RegisterForm />
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Inicia sesión
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              ¿Eres artista?{' '}
              <Link href="/register-artist" className="text-blue-600 hover:underline">
                Solicita tu cuenta de artista
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}