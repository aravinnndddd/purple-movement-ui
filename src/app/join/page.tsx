'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import StepFour from './components/StepFour'

type StepTwoFormData = {
  defining: string
  whyHere: string
  portfolioLink: string
}

type StepThreeFormData = {
  name: string
  email: string
  phone: string
  interested: boolean
  notInterested: boolean
}

export default function JoinUsPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedFromPrevious, setSelectedFromPrevious] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [stepTwoData, setStepTwoData] = useState<StepTwoFormData>({
    defining: '',
    whyHere: '',
    portfolioLink: '',
  })
  const [stepThreeData, setStepThreeData] = useState<StepThreeFormData>({
    name: '',
    email: '',
    phone: '',
    interested: false,
    notInterested: false,
  })

  const steps = [
    { number: 1, active: true },
    { number: 2, active: false },
    { number: 3, active: false },
    { number: 4, active: false }
  ]

  const handleCardClick = (optionId: string) => {
    setSelectedOption(optionId)
    setSelectedFromPrevious(optionId)
    setIsTransitioning(true)

    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, 4))
      setSelectedOption(null)
      setIsTransitioning(false)
    }, 300)
  }

  const handleNextStep = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, 4))
      setIsTransitioning(false)
    }, 300)
  }

  const handleSubmitAndNext = async () => {
    if (currentStep !== 3) {
      handleNextStep()
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const formData = {
        selectedRole: selectedFromPrevious,
        defining: stepTwoData.defining,
        whyHere: stepTwoData.whyHere,
        portfolioLink: stepTwoData.portfolioLink,
        name: stepThreeData.name,
        email: stepThreeData.email,
        phone: stepThreeData.phone,
        notInterested: stepThreeData.notInterested
      }

      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to submit form')
      }

      // Success - proceed to step 4
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(4)
        setIsTransitioning(false)
      }, 300)

    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackStep = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep(prev => Math.max(prev - 1, 1))
      setIsTransitioning(false)
    }, 300)
  }

  const handleUpdateStepTwo = (updates: Partial<StepTwoFormData>) => {
    setStepTwoData(prev => ({ ...prev, ...updates }))
  }

  const handleUpdateStepThree = (updates: Partial<StepThreeFormData>) => {
    setStepThreeData(prev => ({ ...prev, ...updates }))
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne selectedOption={selectedOption} onCardClick={handleCardClick} />
      case 2:
        return (
          <StepTwo
            selectedFromPrevious={selectedFromPrevious}
            formData={stepTwoData}
            onChange={handleUpdateStepTwo}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )
      case 3:
        return (
          <StepThree
            selectedFromPrevious={selectedFromPrevious}
            formData={stepThreeData}
            onChange={handleUpdateStepThree}
            onNext={handleSubmitAndNext}
            onBack={handleBackStep}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )
      case 4:
        return <StepFour userName={stepThreeData.name.trim() || 'Friend'} />
      default:
        return <StepOne selectedOption={selectedOption} onCardClick={handleCardClick} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#020309] via-[#05041b] to-[#020309] text-white">
      <Navbar />

      <main className="flex items-start justify-center pt-24 pb-12 px-4 sm:px-6 md:px-8">
        {/* Background Image - Full Width */}
        <div className="fixed top-50 left-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="/images/formbg.png"
            alt="Background"
            fill
            className="object-cover opacity-50"
          />
        </div>

        <div className="relative w-full max-w-7xl mt-15 mx-auto z-10">
          {/* Form Content */}
          <div className={`relative z-10 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            {renderCurrentStep()}

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 xs:gap-4 pt-12 mt-8 flex-wrap">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  {/* Step Circle */}
                  <div className="relative">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${
                        step.number === currentStep
                          ? 'border-white'
                          : step.number < currentStep
                          ? 'border-violet-700'
                          : 'border-white/40'
                      }`}
                    />
                    <div
                      className={`absolute inset-1 rounded-full ${
                        step.number <= currentStep
                          ? 'bg-violet-700'
                          : 'bg-violet-800/50'
                      }`}
                    />
                    <span
                      className={`absolute inset-0 flex items-center justify-center text-sm sm:text-base font-bold font-montserrat ${
                        step.number <= currentStep ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {step.number < currentStep ? '✓' : step.number}
                    </span>
                  </div>

                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 sm:w-12 h-0.5 mx-2 sm:mx-3 ${
                        step.number < currentStep
                          ? 'bg-violet-700'
                          : 'bg-white/30'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}