'use client'

import { useState } from 'react'
import { ArtistRegistrationData, RegistrationStep } from '@/types/artist-registration'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Step1Account } from './registration-steps/step-1-account'
import { Step2PersonalInfo } from './registration-steps/step-2-personal-info'
import { Step3Verification } from './registration-steps/step-3-verification'
import { Step4ContactBio } from './registration-steps/step-4-contact-bio'
import { Step5Plan } from './registration-steps/step-5-plan'

export function ArtistRegistrationWizard() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(1)
  const [formData, setFormData] = useState<Partial<ArtistRegistrationData>>({
    selectedPlan: 'silver',
    billingPeriod: 'monthly'
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  function updateFormData(data: Partial<ArtistRegistrationData>) {
    setFormData(prev => ({ ...prev, ...data }))
  }

  function nextStep() {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => (prev + 1) as RegistrationStep)
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      setCurrentStep(prev => (prev - 1) as RegistrationStep)
    }
  }

  const stepTitles = {
    1: 'Crear Cuenta',
    2: 'Datos Personales',
    3: 'Verificación',
    4: 'Contacto y Biografía',
    5: 'Seleccionar Plan'
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Paso {currentStep} de {totalSteps}</span>
          <span>{stepTitles[currentStep]}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps */}
      <Card className="p-6">
        {currentStep === 1 && (
          <Step1Account
            data={formData}
            onNext={(data) => {
              updateFormData(data)
              nextStep()
            }}
          />
        )}

        {currentStep === 2 && (
          <Step2PersonalInfo
            data={formData}
            onNext={(data) => {
              updateFormData(data)
              nextStep()
            }}
            onBack={prevStep}
          />
        )}

        {currentStep === 3 && (
          <Step3Verification
            data={formData}
            onNext={(data) => {
              updateFormData(data)
              nextStep()
            }}
            onBack={prevStep}
          />
        )}

        {currentStep === 4 && (
          <Step4ContactBio
            data={formData}
            onNext={(data) => {
              updateFormData(data)
              nextStep()
            }}
            onBack={prevStep}
          />
        )}

        {currentStep === 5 && (
          <Step5Plan
            data={formData}
            onBack={prevStep}
            onComplete={updateFormData}
          />
        )}
      </Card>
    </div>
  )
}