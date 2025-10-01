'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export const Contact = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auto-clear status messages after 5 seconds
  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }

      setSubmitStatus('success');
      setQuestion('');
    } catch (error) {
      console.error('Error submitting question:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-[95%] sm:w-[90%] lg:w-[1070px] mx-auto mt-8 sm:mt-16 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14 bg-slate-900 rounded-2xl sm:rounded-[28px] lg:rounded-[50px] flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
      
      {/* Image Section */}
      <div className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-64 lg:h-64 flex-shrink-0 hidden sm:block">
        <Image 
          src="/images/qtnmark.png" 
          alt="Question Mark"
          fill
          className="object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col items-start text-left gap-3 sm:gap-4">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-montserrat text-white leading-tight">
          Any <br />
          <span className="text-purple-600">Questions?</span>
        </h2>

        {/* Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-white/80 font-medium font-poppins max-w-xl leading-relaxed">
          We&apos;re here to help, reach out anytime!
        </p>

        {/* Input and Submit Section */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 w-full">
            <input 
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              style={{ minHeight: '56px' }}
              className="flex-1 w-full sm:max-w-md bg-transparent border border-stone-500 text-white text-base sm:text-base px-4 py-3 rounded font-poppins placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={!question.trim() || isSubmitting}
              style={{ minHeight: '56px' }}
              className={`w-full sm:w-auto px-6 rounded font-poppins text-base sm:text-base font-medium transition-all duration-200 ${
                question.trim() && !isSubmitting
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-purple-700/50 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <p className="text-green-400 text-sm font-poppins">
              ✓ Question submitted successfully! We&apos;ll get back to you soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 text-sm font-poppins">
              ✗ Failed to submit question. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};