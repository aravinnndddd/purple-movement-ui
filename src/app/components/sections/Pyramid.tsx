'use client'

import Image from "next/image";
import { useState, useRef } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Pyramid = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Define the image source based on hovered section
  const getImageSrc = () => {
    switch (hoveredSection) {
      case 'top':
        return '/svgs/pyramid-t.svg';
      case 'bottom-left':
        return '/svgs/pyramid-bl.svg';
      case 'bottom-right':
        return '/svgs/pyramid-br.svg';
      default:
        return '/svgs/pyramid.svg';
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 py-4">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[750px] aspect-square"
      >
        <Image
          src={getImageSrc()}
          alt="Pyramid"
          fill
          className="object-contain transition-opacity duration-300 ease-in-out"
          priority
        />
        
        {/* Click indicator animation - positioned at bottom right */}
        <div className="absolute bottom-27 right-15 md:bottom-42 md:right-22 w-16 h-16 md:w-24 md:h-24 pointer-events-none z-10">
          <DotLottieReact
            src="https://lottie.host/166e1d3f-79dc-480f-8401-7d646839a4af/g8W5U9eM7Q.lottie"
            loop
            autoplay
          />
        </div>

        {/* Interactive hover zones (invisible click areas) */}
        <div className="absolute inset-0 pointer-events-auto">
          {/* Top section - upper triangle */}
          <div
            className="absolute inset-0 cursor-pointer"
            onMouseEnter={() => setHoveredSection('top')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath: 'polygon(50% 7%, 70% 40%, 50% 51%, 30% 40%)'
            }}
          />

          {/* Bottom Left section */}
          <div
            className="absolute inset-0 cursor-pointer"
            onMouseEnter={() => setHoveredSection('bottom-left')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath: 'polygon(28.5% 43%, 48% 54%, 48% 77%, 10% 77%)'
            }}
          />

          {/* Bottom Right section */}
          <div
            className="absolute inset-0 cursor-pointer"
            onMouseEnter={() => setHoveredSection('bottom-right')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath: 'polygon(71.5% 43%, 52% 54%, 52% 77%, 90% 77%)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pyramid;