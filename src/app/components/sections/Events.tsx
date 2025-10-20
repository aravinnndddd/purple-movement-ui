"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
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

      {/* Swiper with Navigation Arrows */}
      <div className="relative w-full h-[400px] md:h-[450px] mt-8">
        {/* Previous Arrow */}
        <button
          onClick={handlePrevClick}
          disabled={isBeginning}
          className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-white/50 ${
            isBeginning 
              ? 'bg-white/5 border-white/10 cursor-not-allowed opacity-50' 
              : 'bg-white/10 hover:bg-white/20 border-white/30 hover:scale-110 cursor-pointer'
          }`}
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
          disabled={isEnd}
          className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-white/50 ${
            isEnd 
              ? 'bg-white/5 border-white/10 cursor-not-allowed opacity-50' 
              : 'bg-white/10 hover:bg-white/20 border-white/30 hover:scale-110 cursor-pointer'
          }`}
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
          <Swiper
            modules={[Navigation, Pagination, Mousewheel]}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={20}
            loop={false}
            mousewheel={{
              enabled: true,
              forceToAxis: true,
              sensitivity: 0.8,
              releaseOnEdges: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: false
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            speed={500}
            className="w-full h-full events-swiper"
            breakpoints={{
              320: {
                spaceBetween: 15
              },
              640: {
                spaceBetween: 20
              },
              768: {
                spaceBetween: 25
              },
              1024: {
                spaceBetween: 30
              }
            }}
          >
            {events.map((event, index) => (
              <SwiperSlide key={index} className="events-slide">
                <div 
                  className="group relative w-full h-full overflow-hidden rounded-xl bg-gray-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
                >
                  {/* Image Container */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.text}
                      fill
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-montserrat mb-2 drop-shadow-lg tracking-tight">
                      {event.text}
                    </h3>
                    
                    {/* Active Indicator Bar */}
                    {activeIndex === index && (
                      <div className="mt-2 h-0.5 w-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full" />
                    )}
                  </div>

                  {/* Active Border */}
                  {activeIndex === index && (
                    <div className="absolute inset-0 border-2 border-white/30 rounded-xl pointer-events-none" />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .events-swiper {
          padding: 30px 0 50px 0;
        }
        
        .events-swiper .swiper-slide {
          width: 280px;
          height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .events-swiper .swiper-slide {
            width: 240px;
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .events-swiper .swiper-slide {
            width: 220px;
            height: 280px;
          }
        }

        @media (min-width: 1280px) {
          .events-swiper .swiper-slide {
            width: 320px;
            height: 380px;
          }
        }
        
        .events-swiper .swiper-slide-active {
          transform: scale(1.08);
          z-index: 10;
        }

        .events-swiper .swiper-slide-next,
        .events-swiper .swiper-slide-prev {
          opacity: 0.7;
        }
        
        .swiper-pagination {
          bottom: 10px !important;
        }
        
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
          opacity: 1;
        }
        
        .swiper-pagination-bullet-active {
          background: white;
          width: 10px;
          height: 10px;
        }

        .events-swiper {
          cursor: grab;
        }

        .events-swiper:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}

export { Events };
