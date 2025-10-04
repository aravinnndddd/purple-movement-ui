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
      <div className="relative w-full max-w-[750px] aspect-square">
        <Image
          src={getImageSrc()}
          alt="Pyramid"
          fill
          className="object-contain transition-opacity duration-300 ease-in-out"
          priority
        />
        
        {/* Interactive hover zones */}
        <div className="absolute inset-0 pointer-events-auto">
          {/* Top section - upper triangle */}
          <div
            className="absolute inset-0 cursor-pointer"
            onMouseEnter={() => setHoveredSection('top')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath: 'polygon(50% 0%, 70% 39%, 50% 50%, 30% 39%)'
            }}
          />

          {/* Bottom Left section */}
          <div
            className="absolute inset-0 cursor-pointer"
            onMouseEnter={() => setHoveredSection('bottom-left')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath: 'polygon(29% 41%, 48% 55%, 48% 81%, 10% 81%)'
            }}
          />

          {/* Bottom Right section */}
          <div
            className="absolute inset-0 cursor-pointer"
            onMouseEnter={() => setHoveredSection('bottom-right')}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath: 'polygon(71% 41%, 52% 55%, 52% 81%, 90% 81%)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pyramid;