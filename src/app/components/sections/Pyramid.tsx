'use client'

import Image from "next/image";
import { useState } from "react";

const Pyramid = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

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
      <div className="relative">
        <Image
          src={getImageSrc()}
          alt="Pyramid"
          width={750}
          height={750}
          style={{ height: 'auto' }}
          className="object-contain transition-all duration-300 ease-in-out"
        />
        
        {/* Interactive hover zones */}
        <div className="absolute inset-0 pointer-events-auto">
          {/* Top section */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1/2 cursor-pointer"
            onMouseEnter={() => setHoveredSection('top')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)'
            }}
          />
          
          {/* Bottom Left section */}
          <div
            className="absolute bottom-0 left-0 w-1/2 h-1/2 cursor-pointer"
            onMouseEnter={() => setHoveredSection('bottom-left')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath: 'polygon(40% 0%, 0% 100%, 100% 100%)'
            }}
          />
          
          {/* Bottom Right section */}
          <div
            className="absolute bottom-0 right-0 w-1/2 h-1/2 cursor-pointer"
            onMouseEnter={() => setHoveredSection('bottom-right')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath: 'polygon(0% 100%, 60% 0%, 100% 100%)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pyramid;

   