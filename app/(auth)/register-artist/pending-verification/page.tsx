import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Mail, CheckCircle } from 'lucide-react'

export default function PendingVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Clock className="w-10 h-10 text-blue-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">
            ¡Comprobante Recibido!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Estamos verificando tu pago
          </p>

          {/* Steps */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold mb-4">¿Qué sigue ahora?</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium">Comprobante recibido</p>
                  <p className="text-sm text-gray-600">
                    Hemos guardado tu comprobante de pago
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-medium">En proceso de verificación</p>
                  <p className="text-sm text-gray-600">
                    Nuestro equipo revisará tu pago en las próximas 24-48 horas
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-6 h-6 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Recibirás confirmación por email</p>
                  <p className="text-sm text-gray-600">
                    Te notificaremos cuando tu cuenta sea activada
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info adicional */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-yellow-800">
              <strong>💡 Nota:</strong> Si hay algún problema con tu comprobante, 
              te contactaremos al email que proporcionaste para solicitar más información.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link href="/">
                Volver al Inicio
              </Link>
            </Button>
            <p className="text-sm text-gray-500">
              ¿Tienes preguntas? Escríbenos a <strong>soporte@artistspace.cl</strong>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}