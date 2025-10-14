"use client";

import { useRef } from 'react';
import CircularGallery, { CircularGalleryHandle } from './CircularGallery';

const events = [
  {
    image: "/images/flow.png",
    text: "Enter the Flow"
  },
  {
    image: "/images/saddle.jpg",
    text: "Saddle #1"
  },
  {
    image: "/images/p80-1.jpg",
    text: "PRN:80"
  },
  {
    image: "/images/p80-2.jpg",
    text: "STI:80"
  },
  {
    image: "/images/p80-3.jpg",
    text: "AEC&B:80"
  },
  {
    image: "/images/saddle2.jpg",
    text: "Saddle #2"
  },
  {
    image: "/images/hkbr.jpg",
    text: "Hacktober Fest"
  },
  {
    image: "/images/p80-4.jpg",
    text: "AEC&B:80"
  },
  {
    image: "/images/p80-5.jpg",
    text: "PRN:80"
  },
  {
    image: "/images/aic.jpg",
    text: "Ai+Compassion"
  }
];

export default function Events() {
  const galleryRef = useRef<CircularGalleryHandle>(null);

  const handlePrevClick = () => {
    galleryRef.current?.scrollPrev();
  };

  const handleNextClick = () => {
    galleryRef.current?.scrollNext();
  };

  return (
    <div
      className="w-full py-16 bg-black flex flex-col justify-center items-center gap-8 px-4"
      id="events"
    >
      {/* Title */}
      <h2 className="text-center text-white text-2xl sm:text-4xl md:text-5xl font-semibold font-montserrat">
        Events
      </h2>

      {/* Subtitle */}
      <p className="max-w-2xl md:max-w-4xl text-center text-white/75 text-sm sm:text-base md:text-lg font-normal font-poppins px-2 sm:px-0">
        From creative challenges to impactful experiences, our events are
        designed to inspire, push boundaries, and open doors to new
        opportunities.
      </p>

      {/* Circular Gallery with Navigation Arrows */}
      <div className="relative w-full h-[500px] md:h-[600px] mt-8">
        {/* Previous Arrow */}
        <button
          onClick={handlePrevClick}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous event"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next Arrow */}
        <button
          onClick={handleNextClick}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next event"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="w-full h-full">
          <CircularGallery
            ref={galleryRef}
            items={events}
            bend={0}
            textColor="#ffffff"
            borderRadius={0.02}
            font="bold 24px Montserrat"
            scrollSpeed={2}
            scrollEase={0.08}
          />
        </div>
      </div>
    </div>
  );
}

export { Events };