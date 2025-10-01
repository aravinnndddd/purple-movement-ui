'use client'

import { useState } from 'react'

interface StepThreeFormData {
  name: string
  email: string
  phone: string
  interested: boolean
  notInterested: boolean
}

interface StepThreeProps {
  selectedFromPrevious?: string | null
  formData: StepThreeFormData
  onChange: (updates: Partial<StepThreeFormData>) => void
  onNext?: () => void
  onBack?: () => void
  isSubmitting?: boolean
  submitError?: string | null
}

export default function StepThree({
  selectedFromPrevious,
  formData,
  onChange,
  onNext,
  onBack,
  isSubmitting = false,
  submitError = null,
}: StepThreeProps) {
  const { name, email, phone, notInterested } = formData
  
  // Track which fields have been touched
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    phone: false
  })

  // Validation functions
  const validateName = (name: string) => {
    if (!name.trim()) return "Name is required"
    if (name.trim().length < 2) return "Name must be at least 2 characters"
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Name can only contain letters and spaces"
    return ""
  }

  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) return "Please enter a valid email address"
    return ""
  }

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return "Phone number is required"
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    if (!phoneRegex.test(cleanPhone)) return "Please enter a valid phone number"
    if (cleanPhone.length < 10) return "Phone number must be at least 10 digits"
    return ""
  }

  // Get validation errors (only show for touched fields)
  const nameError = !notInterested && touchedFields.name ? validateName(name) : ""
  const emailError = !notInterested && touchedFields.email ? validateEmail(email) : ""
  const phoneError = !notInterested && touchedFields.phone ? validatePhone(phone) : ""

  const isFormValid = notInterested || (name.trim() && email.trim() && phone.trim() && !nameError && !emailError && !phoneError)

  return (
    <div className="w-full px-4 sm:px-6 space-y-8">
      {/* Header & Description */}
      <div className="space-y-6">
        <div className="max-w-[864px] w-full mx-auto space-y-3">
          <h1 className="text-2xl sm:text-4xl font-bold font-montserrat text-white capitalize text-left pl-3 sm:pl-4">
            Tell Us About You
          </h1>
          <div className="justify-start text-white text-base font-normal font-montserrat capitalize pl-3 sm:pl-4">
            We’d love to hear from you, or you can stay anonymous.
          </div>
        </div>

        <div className="max-w-[864px] w-full mx-auto">
          <label 
            className="flex items-center space-x-3 cursor-pointer pl-3 sm:pl-4"
          >
            <div className="relative cursor-pointer">
              <input
                type="checkbox"
                checked={notInterested}
                onChange={(e) => onChange({ notInterested: e.target.checked })}
                className="w-5 h-5 border border-red-400 bg-transparent appearance-none rounded-sm focus:ring-purple-500 focus:outline-none cursor-pointer"
              />
              {notInterested && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <span className="text-red-400 text-xl font-medium font-poppins capitalize">
              Stay Anonymous
            </span>
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="max-w-[864px] w-full mx-auto space-y-8">
        {/* Name */}
        <div className="space-y-3">
          <label className={`block text-sm sm:text-lg text-white font-bold font-montserrat capitalize
            ${notInterested ? 'opacity-50' : ''}
          `}>
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onChange({ name: e.target.value })}
            onFocus={() => setTouchedFields(prev => ({ ...prev, name: true }))}
            disabled={notInterested}
            className={`w-full h-11 px-4 text-sm sm:text-base bg-transparent border rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              nameError && !notInterested
                ? 'border-red-500 focus:ring-red-500'
                : 'border-white focus:ring-violet-700'
            }`}
            placeholder="Enter your full name"
          />
          {nameError && !notInterested && (
            <p className="text-red-400 text-sm mt-1">{nameError}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-3">
          <label className={`block text-sm sm:text-lg text-white font-bold font-montserrat capitalize
            ${notInterested ? 'opacity-50' : ''}
          `}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onChange({ email: e.target.value })}
            onFocus={() => setTouchedFields(prev => ({ ...prev, email: true }))}
            disabled={notInterested}
            className={`w-full h-11 px-4 text-sm sm:text-base bg-transparent border rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              emailError && !notInterested
                ? 'border-red-500 focus:ring-red-500'
                : 'border-white focus:ring-violet-700'
            }`}
            placeholder="Enter your email address"
          />
          {emailError && !notInterested && (
            <p className="text-red-400 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-3">
          <label className={`block text-sm sm:text-lg text-white font-bold font-montserrat capitalize
            ${notInterested ? 'opacity-50' : ''}
          `}>
            Phone:
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            onFocus={() => setTouchedFields(prev => ({ ...prev, phone: true }))}
            disabled={notInterested}
            className={`w-full h-11 px-4 text-sm sm:text-base bg-transparent border rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              phoneError && !notInterested
                ? 'border-red-500 focus:ring-red-500'
                : 'border-white focus:ring-violet-700'
            }`}
            placeholder="Enter your phone number"
          />
          {phoneError && !notInterested && (
            <p className="text-red-400 text-sm mt-1">{phoneError}</p>
          )}
        </div>
      </div>

      {/* Submit Error */}
      {submitError && (
        <div className="max-w-[864px] w-full mx-auto">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400 text-sm">{submitError}</p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center max-w-[864px] w-full mx-auto">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className={`w-full sm:w-32 py-2 rounded flex justify-center items-center gap-1.5 transition-colors ${
            isSubmitting 
              ? 'bg-purple-700/30 cursor-not-allowed' 
              : 'bg-purple-700/60 hover:bg-purple-700'
          }`}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-white text-sm font-inter">Back</span>
        </button>

        <button
          onClick={onNext}
          disabled={!isFormValid || isSubmitting}
          className={`w-full sm:w-32 py-2 rounded flex justify-center items-center gap-1.5 transition-colors ${
            isFormValid && !isSubmitting
              ? 'bg-purple-700 hover:bg-purple-600'
              : 'bg-purple-700/50 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-white text-sm font-inter">Submitting...</span>
            </>
          ) : (
            <>
              <span className="text-white text-sm font-inter">Submit</span>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Selected Role Footer */}
      {selectedFromPrevious && (
        <p className="text-xs sm:text-sm text-white/60 text-center mt-4">
          Joining as:{' '}
          <span className="text-violet-400 font-medium capitalize">
            {selectedFromPrevious}
          </span>
        </p>
      )}
    </div>
  )
}