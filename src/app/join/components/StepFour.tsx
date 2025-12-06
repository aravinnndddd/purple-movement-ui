'use client'

import { FaWhatsapp } from "react-icons/fa6"
import Link from "next/link"
import { MdHome } from "react-icons/md"

interface StepFourProps {
  userName?: string
  isAnonymous?: boolean
}

export default function StepFour({ userName = "Friend", isAnonymous = false }: StepFourProps) {
  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/JfnuaMproG51BoNJZ21LNB', '_blank')
  }

  // If user chose to stay anonymous, show simplified message
  if (isAnonymous) {
    return (
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className="w-[904px] bg-slate-900 rounded-[10px] flex flex-col items-center justify-center py-10 gap-8">
            <div className="w-80 space-y-6 flex flex-col items-center">
              <div className="text-center text-white text-5xl font-bold font-montserrat capitalize">Thank You!</div>
              <div className="text-center text-white text-xl font-normal font-poppins capitalize">We&apos;ve received your response.</div>
              
              {/* Go Home Button */}
              <Link href="/" className="mt-4">
                <div className="px-7 py-3.5 bg-purple-700 hover:bg-purple-600 rounded inline-flex justify-center items-center gap-1.5 transition-all duration-300 cursor-pointer">
                  <div className="text-center text-white text-xl font-bold font-montserrat capitalize">Go Home</div>
                  <MdHome className="w-5 h-5 text-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
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
            We&apos;ve received your response.
          </p>

          <div className="text-center justify-start sm:text-base md:text-lg text-white text-xl font-semibold font-poppins capitalize">Join our WhatsApp for updates.</div>
          {/* WhatsApp Button */}
          <div className="w-full flex justify-center">
            <button
            onClick={handleWhatsAppJoin}
            className="-mt-5 sm:w-auto px-6 py-3 bg-violet-700 hover:bg-violet-600 text-white text-sm sm:text-base font-bold font-montserrat rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
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