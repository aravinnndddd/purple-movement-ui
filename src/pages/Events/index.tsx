import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "../../components/Navbar/navbar";

// --- EventCard Component ---
interface EventCardProps {
  id: string;
  eventNumber: string;
  title: string;
  description?: string;
  imageUrl?: string;
  isComingSoon?: boolean;
  registerLink?: string;
  active?: boolean;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  imageUrl,
  isComingSoon = false,
  active = false,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`group cursor-pointer transition-all duration-700 ease-out rounded-2xl flex flex-col p-4 sm:p-6 items-start text-left w-[240px] sm:w-[280px] h-[360px] sm:h-[400px] relative ${
      active
        ? "scale-100 z-10 opacity-100"
        : "opacity-60 hover:opacity-80 scale-95"
    }`}
  >
    <div
      className={`absolute inset-0 rounded-2xl border transition-all duration-500 ${
        active
          ? "bg-white/10 backdrop-blur-md border-white/30 shadow-2xl"
          : "bg-white/5 backdrop-blur-md border-white/10"
      }`}
    />
    <div className="relative z-10 flex flex-col h-full">
      {imageUrl && (
        <div className="relative overflow-hidden rounded-xl mb-4 w-full h-[160px] sm:h-[200px]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex items-center justify-between mb-3 w-full">
        <h3
          className={`font-bold text-lg sm:text-xl transition-colors duration-300 ${
            active ? "text-white" : "text-gray-300"
          }`}
        >
          {title}
        </h3>
        {!isComingSoon && (
          <button className="text-purple-400 hover:text-purple-300 transition-all duration-300 transform hover:scale-110 p-1 rounded-full border border-white/20 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
            <ArrowUpRight size={16} />
          </button>
        )}
      </div>

      {!isComingSoon && description && (
        <p
          className={`text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
            active ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      )}

      {isComingSoon && (
        <div className="flex items-center justify-center flex-1 w-full h-full">
          <div className="flex flex-col items-center justify-center">
            <p className="text-purple-300 font-medium text-base sm:text-lg mb-4">
              Stay Tuned...
            </p>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

// --- Events Page ---
const Events: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const events: EventCardProps[] = [
    {
      id: "event-1",
      eventNumber: "EVENT 01",
      title: "Enter the Flow",
      description: "A flash UI/UX hackathon where creativity meets speed",
      imageUrl: "./enter the flow.png",
    },
    {
      id: "event-2",
      eventNumber: "EVENT 02",
      title: "Saddle Up",
      description:
        "A skill-building event series to gear you up for opportunities.",
      imageUrl: "saddle up.png",
    },
    {
      id: "event-3",
      eventNumber: "EVENT 03",
      title: "",
      isComingSoon: true,
    },
  ];

  // Center active card (desktop only)
  useEffect(() => {
    if (window.innerWidth < 768) return; // Skip on mobile
    const container = carouselRef.current;
    const activeCard = cardRefs.current[activeIndex];
    if (container && activeCard) {
      const scrollLeft =
        activeCard.offsetLeft -
        container.offsetWidth / 2 +
        activeCard.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrev();
      else if (event.key === "ArrowRight") handleNext();
      else if (event.key === " ") {
        event.preventDefault();
        toggleAutoPlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  }, [events.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const handleCardClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    // optional autoplay logic
  }, []);

  // Swipe handling (mobile only)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-16 sm:py-24 px-4 bg-gradient-to-br from-[#0d0b1a] via-[#1a0f2e] to-[#0d0b1a] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-white text-3xl sm:text-5xl font-bold mb-4">
              Events
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              From creative challenges to impactful experiences, our events are
              designed to inspire, push boundaries, and open doors to new
              opportunities.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Navigation Buttons (Desktop) */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hidden md:flex items-center justify-center group"
            >
              <ChevronLeft
                size={20}
                className="text-white group-hover:text-purple-200 transition-colors"
              />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hidden md:flex items-center justify-center group"
            >
              <ChevronRight
                size={20}
                className="text-white group-hover:text-purple-200 transition-colors"
              />
            </button>

            {/* Cards */}
            <div
              ref={carouselRef}
              className="flex gap-4 sm:gap-8 overflow-x-auto overflow-y-visible px-2 sm:px-6 py-6 sm:py-8 snap-x snap-mandatory justify-start md:justify-center scrollbar-hide"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {events.map((event, index) => (
                <div
                  key={event.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="snap-center"
                >
                  <EventCard
                    {...event}
                    active={index === activeIndex}
                    onClick={() => handleCardClick(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center items-center gap-4 mt-2">
            <div className="flex gap-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? "w-6 sm:w-8 h-2 sm:h-3 bg-purple-400"
                      : "w-2 sm:w-3 h-2 sm:h-3 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden text-center mt-6">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              Swipe to navigate
            </p>
          </div>

          {/* Desktop Keyboard Hint */}
          <div className="hidden md:block text-center mt-6">
            <p className="text-gray-500 text-sm">
              Use <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>{" "}
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd> to
              navigate •{" "}
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Space</kbd>{" "}
              to pause
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
