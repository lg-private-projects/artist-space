import { LoginForm } from '@/components/auth/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Artist Space</h1>
          <p className="text-gray-600 mt-2">Inicia sesión en tu cuenta</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <LoginForm />
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link href="/register" className="text-blue-600 hover:underline">
                Regístrate como visitante
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              ¿Eres Creador?{' '}
              <Link href="/register-artist" className="text-blue-600 hover:underline">
                Solicita tu cuenta de Creador
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}