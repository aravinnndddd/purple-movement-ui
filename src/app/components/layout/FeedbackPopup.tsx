'use client'

import Image from 'next/image'
import { useState } from 'react'

interface FeedbackPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackPopup({ isOpen, onClose }: FeedbackPopupProps) {
  const [feedback, setFeedback] = useState('')
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const reactions = [
    { id: 'very-sad', src: '/images/fbr1.png', alt: 'Very Sad' },
    { id: 'sad', src: '/images/fbr2.png', alt: 'Sad' },
    { id: 'neutral', src: '/images/fbr3.png', alt: 'Neutral' },
    { id: 'happy', src: '/images/fbr4.png', alt: 'Happy' },
    { id: 'very-happy', src: '/images/fbr5.png', alt: 'Very Happy' }
  ]

  const handleReactionClick = (reactionId: string) => {
    setSelectedReaction(selectedReaction === reactionId ? null : reactionId)
  }

  const handleSubmit = async () => {
    if (!feedback.trim() && !selectedReaction) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reaction: selectedReaction,
          feedback: feedback.trim(),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit feedback')
      }

      // Reset form and close popup
      setFeedback('')
      setSelectedReaction(null)
      onClose()
    } catch (error) {
      console.error('Error submitting feedback:', error)
      // You can add error handling UI here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      {/* Mobile Layout */}
      <div className="block md:hidden w-full max-w-[90vw] sm:max-w-[500px] h-auto max-h-[90vh] bg-slate-900 rounded-[15px] sm:rounded-[20px] overflow-y-auto relative p-4 sm:p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white text-xl sm:text-2xl z-10 transition-colors"
        >
          ×
        </button>

        {/* Main heading */}
        <div className="text-center mb-4 sm:mb-6 pt-2 sm:pt-0">
          <h2 className="text-white text-xl xs:text-2xl sm:text-3xl font-bold font-montserrat tracking-wide leading-tight">
            How helpful was this?
          </h2>
        </div>

        {/* Reactions section */}
        <div className="flex justify-center items-center gap-1 xs:gap-2 sm:gap-3 mb-4 sm:mb-6">
          {reactions.map((reaction) => (
            <button
              key={reaction.id}
              onClick={() => handleReactionClick(reaction.id)}
              className={`transition-all duration-200 hover:opacity-100 hover:scale-110 p-1 ${
                selectedReaction === reaction.id 
                  ? 'opacity-100 scale-110' 
                  : 'opacity-25'
              }`}
              title={reaction.alt}
            >
              <Image
                src={reaction.src}
                alt={reaction.alt}
                width={48}
                height={48}
                className="object-contain w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10"
              />
            </button>
          ))}
        </div>

        {/* Feedback input */}
        <div className="relative w-full h-32 rounded border border-neutral-400 mb-6">
          {!feedback && (
            <div className="absolute left-4 top-4 text-neutral-400 text-sm font-normal font-poppins tracking-tight pointer-events-none">
              Feedback
            </div>
          )}
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={`w-full h-full px-4 pb-4 bg-transparent text-white text-sm font-poppins resize-none focus:outline-none ${
              !feedback ? 'pt-10' : 'pt-4'
            }`}
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={(!feedback.trim() && !selectedReaction) || isSubmitting}
            className="w-full max-w-32 py-2 px-4 bg-purple-700 rounded inline-flex justify-center items-center gap-2.5 text-white text-lg font-normal font-inter disabled:opacity-50 hover:bg-purple-600 transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block w-[780px] h-[511px] bg-slate-900 rounded-[50px] overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-white/60 hover:text-white text-2xl z-10 transition-colors"
        >
          ×
        </button>

        {/* Main heading */}
        <div className="absolute left-[121.5px] top-[66.32px]">
          <h2 className="text-white text-5xl font-bold font-montserrat tracking-wide">
            How helpful was this?
          </h2>
        </div>

        {/* Reactions section */}
        <div className="absolute left-[179px] top-[148px] flex justify-start items-start gap-6">
          {reactions.map((reaction) => (
            <button
              key={reaction.id}
              onClick={() => handleReactionClick(reaction.id)}
              className={`transition-all duration-200 hover:opacity-100 hover:scale-110 ${
                selectedReaction === reaction.id 
                  ? 'opacity-100 scale-110' 
                  : 'opacity-25'
              }`}
              title={reaction.alt}
            >
              <Image
                src={reaction.src}
                alt={reaction.alt}
                width={50}
                height={50}
                className="object-contain"
              />
            </button>
          ))}
        </div>

        {/* Feedback input */}
        <div className="w-[544.59px] h-40 absolute left-[125.06px] top-[227.28px] rounded border border-neutral-400">
          {!feedback && (
            <div className="absolute left-[15.91px] top-[16.61px] text-neutral-400 text-lg font-normal font-poppins tracking-tight pointer-events-none">
              Feedback
            </div>
          )}
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={`w-full h-full px-4 pb-4 bg-transparent text-white text-lg font-poppins resize-none focus:outline-none ${
              !feedback ? 'pt-12' : 'pt-4'
            }`}
          />
        </div>

        {/* Submit button */}
        <div className="w-32 p-2.5 absolute left-[329px] top-[406px] bg-purple-700 rounded inline-flex justify-center items-center gap-2.5">
          <button
            onClick={handleSubmit}
            disabled={(!feedback.trim() && !selectedReaction) || isSubmitting}
            className="text-white text-xl font-normal font-inter disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  )
}