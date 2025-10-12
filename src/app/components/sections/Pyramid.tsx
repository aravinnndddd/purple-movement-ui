'use client'

import Image from "next/image";
import { useState, useRef } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Pyramid = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const sectionContent = {
    top: {
      heading: "Beyond Borders",
      paragraph: "Empowering curious minds to turn ideas into real-world skills, building the confidence to grow and create without limits."
    },
    'bottom-left': {
      heading: "Beyond Gatekeepers",
      paragraph: "Empowering curious minds to turn ideas into real-world skills, building the confidence to grow and create without limits."
    },
    'bottom-right': {
      heading: "Beyond Syllabus",
      paragraph: "Empowering curious minds to turn ideas into real-world skills, building the confidence to grow and create without limits."
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

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
        onMouseMove={handleMouseMove}
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