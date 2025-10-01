'use client'

import { FaWhatsapp } from "react-icons/fa6"

interface StepFourProps {
  userName?: string
}

export default function StepFour({ userName = "Friend" }: StepFourProps) {
  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/your-group-link', '_blank')
  }

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-900 rounded-xl px-5 py-8 sm:px-10 sm:py-10 text-center space-y-6 sm:space-y-8 shadow-md">
          {/* Heading */}
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold font-montserrat text-white capitalize">
            Thank you {userName}
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg font-poppins text-white/80 max-w-xl mx-auto leading-relaxed">
            We&apos;ve received your message. <br className="hidden sm:inline" />
            Our team will get back to you shortly.
          </p>

          {/* WhatsApp Button */}
          <div className="w-full flex justify-center">
            <button
            onClick={handleWhatsAppJoin}
            className=" sm:w-auto px-6 py-3 bg-violet-700 hover:bg-violet-600 text-white text-sm sm:text-base font-bold font-montserrat rounded-3xl flex items-center justify-center gap-2 transition-all duration-300"
          >
            <span>Join WhatsApp</span>
            <FaWhatsapp className="w-5 h-5 text-white" />
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}