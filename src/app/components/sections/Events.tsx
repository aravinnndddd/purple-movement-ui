"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const events = [
  {
    title: "Enter the Flow",
    imgPath: "/images/flow.png",
    desc: "A flash UI/UX hackathon where creativity meets speedy.",
    size: "small",
  },
  {
    title: "Saddle",
    imgPath: "/images/saddle.jpg",
    desc: "A skill-building event series to gear you up for opportunities.",
    size: "large",
  },
  {
    title: "Stay Tuned...",
    desc: null,
    imgPath: null,
    size: "small",
  },
];

export const Events = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Desktop card dimensions
  const CARD_W = 300; // px — card width
  const CARD_H = 360; // px — card height
  const GAP = 24; // px gap between cards

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  // translateX so active card centers perfectly
  const translateX =
    viewportWidth > 0
      ? Math.round(viewportWidth / 2 - (currentIndex * (CARD_W + GAP) + CARD_W / 2))
      : 0;

  return (
    <div
      className="w-full py-16 bg-black flex flex-col justify-center items-center gap-8 px-4"
      id="events"
    >
      {/* Title */}
      <div className="text-center text-white text-2xl sm:text-4xl md:text-5xl font-semibold font-montserrat">
        Events
      </div>

      {/* Subtitle */}
      <div className="max-w-2xl md:max-w-4xl text-center text-white/75 text-sm sm:text-base md:text-lg font-normal font-poppins px-2 sm:px-0">
        From creative challenges to impactful experiences, our events are
        designed to inspire, push boundaries, and open doors to new
        opportunities.
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative w-full max-w-sm mt-8">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {events.map((event, idx) => (
              <div key={idx} className="w-full flex-shrink-0 px-4">
                {event.imgPath ? (
                  <div className="w-full bg-gray-900 rounded-lg shadow-md shadow-black/25 border border-white/50 cursor-pointer">
                    <div className="relative w-full h-96 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                      <div className="flex flex-col items-center justify-center h-full px-4 pt-6 pb-20 z-0 relative">
                        <div className="mb-6">
                          <Image
                            src={event.imgPath}
                            alt={event.title}
                            width={180}
                            height={160}
                            className="object-contain rounded-lg border border-white/50"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6 z-20">
                        <div className="text-white text-lg font-semibold font-montserrat mb-1">
                          {event.title}
                        </div>
                        <div className="text-white/90 text-sm font-poppins leading-snug">
                          {event.desc}
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-6 z-20">
                        <Image
                          src="/svgs/arrow.svg"
                          alt="Arrow"
                          width={22}
                          height={22}
                          className="opacity-100"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-96 bg-gray-900 rounded-lg shadow-md shadow-black/25 border border-white/50 flex flex-col items-center justify-center relative cursor-pointer p-6">
                    <div className="text-center text-white/70 text-xl font-semibold font-montserrat">
                      {event.title}
                    </div>
                    <div className="absolute bottom-2 right-6">
                      <Image
                        src="/svgs/arrow.svg"
                        alt="Arrow"
                        width={22}
                        height={22}
                        className="opacity-40"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {events.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-white w-8" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Carousel */}
      <div className="hidden md:block relative w-full max-w-[1400px] mt-8">
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30"
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
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30"
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
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Centered viewport with extra space to prevent clipping */}
        <div
          ref={viewportRef}
          className="mx-auto overflow-hidden flex items-center"
          style={{
            height: `${CARD_H + 80}px`,
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <div
            className="flex items-center flex-nowrap transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${translateX}px)`,
              gap: `${GAP}px`,
            }}
          >
            {events.map((event, idx) => {
              const isActive = idx === currentIndex;
              const isAdjacent =
                idx === (currentIndex - 1 + events.length) % events.length ||
                idx === (currentIndex + 1) % events.length;

              return (
                <div
                  key={idx}
                  className="flex-shrink-0 transition-all duration-500 flex justify-center items-center"
                  style={{
                    width: `${CARD_W}px`,
                    height: `${CARD_H}px`,
                    transform: isActive
                      ? "scale(1.08)"
                      : isAdjacent
                      ? "scale(0.96)"
                      : "scale(0.9)",
                    opacity: isActive ? 1 : isAdjacent ? 0.65 : 0.32,
                    zIndex: isActive ? 30 : isAdjacent ? 20 : 10,
                  }}
                >
                  <div className="w-full h-full bg-gray-900 rounded-lg shadow-md shadow-black/25 border border-white/50 overflow-hidden cursor-pointer">
                    {event.imgPath ? (
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                        <div className="flex flex-col items-center justify-center h-full px-4 pt-6 pb-20 z-0 relative">
                          <div className="mb-6">
                            <Image
                              src={event.imgPath}
                              alt={event.title}
                              width={160}
                              height={130}
                              className="object-contain rounded-lg border border-white/50"
                            />
                          </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 z-20">
                          <div className="text-white text-lg font-semibold font-montserrat mb-1">
                            {event.title}
                          </div>
                          <div className="text-white/90 text-sm font-poppins leading-snug">
                            {event.desc}
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-6 z-20">
                          <Image
                            src="/svgs/arrow.svg"
                            alt="Arrow"
                            width={22}
                            height={22}
                            className="opacity-100"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6">
                        <div className="text-center text-white/70 text-xl font-semibold font-montserrat">
                          {event.title}
                        </div>
                        <div className="absolute bottom-2 right-6">
                          <Image
                            src="/svgs/arrow.svg"
                            alt="Arrow"
                            width={22}
                            height={22}
                            className="opacity-40"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {events.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-white w-8" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};