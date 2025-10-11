"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const events = [
  {
    title: "Enter the Flow",
    imgPath: "/images/flow.png",
    desc: "A flash UI/UX hackathon where creativity meets speedy.",
    size: "small",
  },
  {
    title: "Saddle #1",
    imgPath: "/images/saddle.jpg",
    desc: "A skill-building event series to gear you up for opportunities.",
    size: "small",
  },
  {
    title: "PRN:80",
    imgPath: "/images/p80-1.jpg",
    desc: "PRN:80 is a tech talk series linking students with industry experts on emerging trends and applications.",
    size: "large",
  },
  {
    title: "STI:80",
    imgPath: "/images/p80-2.jpg",
    desc: "STI:80 is a talk series that connects students with industry professionals, helping bridge knowledge beyond classrooms.",
    size: "small",
  },
  {
    title: "AEC&B:80",
    imgPath: "/images/p80-3.jpg",
    desc: "AEC&B:80 is a conference focused on Digital Construction: The New Language of Construction Management.",
    size: "small",
  },
  {
    title: "Saddle #2",
    imgPath: "/images/saddle2.jpg",
    desc: "A skill-building event series to gear you up for opportunities.",
    size: "large",
  },
  {
    title: "Hacktober Fest",
    imgPath: "/images/hkbr.jpg",
    desc: "The playlist will guide students in getting started with contributions and participating effectively in Hacktober Fest 2025.",
    size: "small",
  },
  {
    title: "AEC&B:80",
    imgPath: "/images/p80-4.jpg",
    desc: "Ever wondered how do we bridge the gap between ambitious blueprints and the on-ground realities of infrastructure projects?",
    size: "small",
  },
  {
    title: "PRN:80",
    imgPath: "/images/p80-5.jpg",
    desc: "PRN:80 is a tech talk series linking students with industry experts on emerging trends and applications.",
    size: "large",
  },
  {
    title: "Ai+Compassion",
    imgPath: "/images/aic.jpg",
    desc: "We're proud to have The Purple Movement as a partner for the AI+Compassion Global Forum 2025.",
    size: "large",
  },
];

// Type definitions
interface Event {
  title: string;
  imgPath: string;
  desc: string;
  size: string;
}

interface EventCardProps {
  event: Event;
  isActive?: boolean;
  isAdjacent?: boolean;
  isMobile?: boolean;
}

// Extracted EventCard component for better organization
const EventCard = ({ event, isMobile = false }: EventCardProps) => {
  const cardClasses = isMobile
    ? "w-full bg-gray-900 rounded-lg shadow-md shadow-black/25 border border-white/50 cursor-pointer"
    : "w-full h-full bg-gray-900 rounded-lg shadow-md shadow-black/25 border border-white/50 overflow-hidden cursor-pointer";

  if (!event.imgPath) {
    return (
      <div className={`${cardClasses} ${isMobile ? 'h-96' : ''} flex flex-col items-center justify-center relative p-6`}>
        <div className="text-center text-white/70 text-xl font-semibold font-montserrat">
          {event.title}
        </div>
      </div>
    );
  }

  return (
    <div className={cardClasses}>
      <div className={`relative w-full ${isMobile ? 'h-96' : 'h-full'} rounded-lg overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <div className="flex flex-col items-center justify-center h-full px-4 pt-6 pb-20 z-0 relative">
          <div className="mb-6">
            <Image
              src={event.imgPath}
              alt={event.title}
              width={isMobile ? 180 : 160}
              height={isMobile ? 160 : 130}
              className="object-contain rounded-lg border border-white/50"
              loading="lazy"
            />
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <div className="text-white text-lg font-semibold font-montserrat mb-1">
            {event.title}
          </div>
          <div className="text-white/90 text-sm font-poppins leading-snug line-clamp-3">
            {event.desc}
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation button component
interface NavButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  ariaLabel: string;
}

const NavButton = ({ direction, onClick, ariaLabel }: NavButtonProps) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
    style={{ [direction === 'prev' ? 'left' : 'right']: '1rem' }}
    aria-label={ariaLabel}
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
      <polyline points={direction === 'prev' ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  </button>
);

export default function Events() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragDeltaX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Desktop card dimensions
  const CARD_W = 300;
  const CARD_H = 360;
  const GAP = 24;
  const AUTOPLAY_INTERVAL = 5000;
  const SWIPE_THRESHOLD = 50;

  // Create infinite loop with more clones to prevent seeing the end
  const cloneCount = 5; // Increased from 2 to 5 for smoother infinite scroll
  const infiniteEvents = [
    ...events.slice(-cloneCount),
    ...events,
    ...events.slice(0, cloneCount)
  ];

  // Initialize at first real item (after clones)
  useEffect(() => {
    setCurrentIndex(cloneCount);
  }, []);

  // Memoized navigation functions
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Handle seamless loop - instantly jump when reaching clones
  useEffect(() => {
    const handleTransitionEnd = () => {
      // If we're past the real items into end clones
      if (currentIndex >= events.length + cloneCount) {
        setIsTransitioning(false);
        setCurrentIndex(cloneCount);
      }
      // If we're before the real items into start clones
      else if (currentIndex < cloneCount) {
        setIsTransitioning(false);
        setCurrentIndex(events.length + cloneCount - 1);
      }
    };

    if (isTransitioning) {
      const timer = setTimeout(handleTransitionEnd, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning]);

  // Re-enable transitions after instant jump
  useEffect(() => {
    if (!isTransitioning) {
      // Use requestAnimationFrame for smoother transition re-enable
      const frameId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [isTransitioning]);

  // Viewport width tracking
  useEffect(() => {
    const updateViewportWidth = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      }
    };
    
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;

    autoPlayRef.current = setInterval(nextSlide, AUTOPLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        setIsPaused(true);
      } else if (e.key === "ArrowRight") {
        nextSlide();
        setIsPaused(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Calculate desktop carousel translation
  const translateX = viewportWidth > 0
    ? Math.round(viewportWidth / 2 - (currentIndex * (CARD_W + GAP) + CARD_W / 2))
    : 0;

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const currentX = e.touches[0].clientX;
    touchDeltaX.current = touchStartX.current - currentX;
    setDragOffset(-touchDeltaX.current);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD) {
      if (touchDeltaX.current > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setDragOffset(0);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || dragStartX.current === null) return;
    const currentX = e.clientX;
    dragDeltaX.current = dragStartX.current - currentX;
    setDragOffset(-dragDeltaX.current);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    const DRAG_THRESHOLD = 100;
    if (Math.abs(dragDeltaX.current) > DRAG_THRESHOLD) {
      if (dragDeltaX.current > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    dragStartX.current = null;
    dragDeltaX.current = 0;
    setDragOffset(0);
    setIsDragging(false);
  }, [isDragging, nextSlide, prevSlide]);

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Add mouse event listeners for desktop drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleNavClick = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      prevSlide();
    } else {
      nextSlide();
    }
    setIsPaused(true);
  };

  const handleCardClick = (idx: number) => {
    // Only navigate if not dragging
    if (isDragging || Math.abs(dragDeltaX.current) > 5) return;
    if (idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  };

  return (
    <div
      className="w-full py-16 bg-black flex flex-col justify-center items-center gap-8 px-4"
      id="events"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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

      {/* Mobile Carousel */}
      <div
        className="md:hidden relative w-full max-w-sm mt-8"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden">
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-300 ease-out' : ''}`}
            style={{ 
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
              willChange: dragOffset !== 0 ? 'transform' : 'auto'
            }}
          >
            {infiniteEvents.map((event, idx) => (
              <div key={`mobile-${idx}`} className="w-full flex-shrink-0 px-4">
                <EventCard event={event} isActive={idx === currentIndex} isMobile={true} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Carousel */}
      <div className="hidden md:block relative w-full max-w-[1400px] mt-8">
        <NavButton direction="prev" onClick={() => handleNavClick('prev')} ariaLabel="Previous event" />
        <NavButton direction="next" onClick={() => handleNavClick('next')} ariaLabel="Next event" />

        <div
          ref={viewportRef}
          className="mx-auto overflow-hidden flex items-center"
          style={{
            height: `${CARD_H + 80}px`,
            width: "100%",
            maxWidth: "1200px",
          }}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={carouselRef}
            className={`flex items-center flex-nowrap ${isTransitioning && !isDragging ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{
              transform: `translateX(${translateX + dragOffset}px)`,
              gap: `${GAP}px`,
              willChange: 'transform',
              cursor: isDragging ? 'grabbing' : 'ew-resize',
              userSelect: 'none'
            }}
            onMouseDown={handleMouseDown}
          >
            {infiniteEvents.map((event, idx) => {
              const isActive = idx === currentIndex;
              const isAdjacent = idx === currentIndex - 1 || idx === currentIndex + 1;

              return (
                <div
                  key={`desktop-${idx}`}
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
                    pointerEvents: isDragging ? 'none' : 'auto'
                  }}
                  onClick={() => handleCardClick(idx)}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                >
                  <EventCard event={event} isActive={isActive} isAdjacent={isAdjacent} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Events };