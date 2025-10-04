"use client";

import { useState, useRef, useCallback } from "react";

const sections = [
  [
    "We are the Manifestors of Change.",
    "We are not waiting for the future.",
    "We are building it with courage, code, creativity, and clarity.",
    "We are the voice of a generation that refuses to settle.",
  ],
  [
    "We are not consumers of culture.",
    "We are producers of purpose.",
    "We break barriers, not just for ourselves, but for every young mind daring to dream.",
    "We believe in ecosystems that empower, not limit.",
  ],
  [
    "In access, not gatekeeping.",
    "In bold visions, not borrowed templates.",
    "We are here to reclaim the narrative, To give confidence to the curious, Networks to the bold, And direction to the determined.",
    "This is The Purple Movement.",
    "A wave of youth power, purpose, and possibility.",
  ],
  [
    "A signal that change is not coming it's already here.",
    "We are the energy.",
    "We are the strategy.",
    "We are the spark.",
  ],
  ["And it starts now."],
];

const flatText = sections.flatMap(
  (section, sectionIndex) =>
    section.map((line) => ({
      line,
      section: sectionIndex,
    }))
);

export const Manifesto = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHijacking, setIsHijacking] = useState(false);
  const scrollContainerRef = useRef(null);
  
  const accumulatedDelta = useRef(0);
  const animationFrameId = useRef(null);
  const velocity = useRef(0);
  const lastTime = useRef(Date.now());

  const lineHeight = 35;
  const sectionGap = 40;

  const lineOffsets = flatText.map((item, i) => {
    const section = item.section;
    const linesBefore = i;
    const gapsBefore = section;
    return linesBefore * lineHeight + gapsBefore * sectionGap;
  });

  // Enable hijacking when the user hovers or touches the container
  const enableHijacking = useCallback(() => {
    if (!isHijacking) {
      setIsHijacking(true);
      document.body.style.overflow = "hidden";
    }
  }, [isHijacking]);

  const disableHijacking = useCallback(() => {
    if (isHijacking) {
      setIsHijacking(false);
      document.body.style.overflow = "auto";
      // Don't reset velocity and accumulated delta here - let momentum finish
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    }
  }, [isHijacking]);

  // Apply momentum and smooth scrolling
  const applyMomentum = useCallback(() => {
    const friction = 0.88;
    const threshold = 0.01;

    if (Math.abs(velocity.current) > threshold) {
      accumulatedDelta.current += velocity.current;
      velocity.current *= friction;

      const scrollThreshold = lineHeight;
      
      if (Math.abs(accumulatedDelta.current) >= scrollThreshold) {
        const direction = accumulatedDelta.current > 0 ? 1 : -1;
        
        setCurrentIndex((prev) => {
          const nextIndex = prev + direction;
          
          if (nextIndex >= flatText.length) {
            velocity.current = 0;
            accumulatedDelta.current = 0;
            if (animationFrameId.current) {
              cancelAnimationFrame(animationFrameId.current);
              animationFrameId.current = null;
            }
            // Don't disable hijacking, just stop at the end
            return prev;
          }
          
          if (nextIndex < 0) {
            velocity.current = 0;
            accumulatedDelta.current = 0;
            if (animationFrameId.current) {
              cancelAnimationFrame(animationFrameId.current);
              animationFrameId.current = null;
            }
            // Don't disable hijacking, just stop at the start
            return prev;
          }
          
          accumulatedDelta.current -= direction * scrollThreshold;
          return nextIndex;
        });
      }

      animationFrameId.current = requestAnimationFrame(applyMomentum);
    } else {
      velocity.current = 0;
      animationFrameId.current = null;
    }
  }, [lineHeight]);

  // Wheel scrolling with velocity
  const handleWheel = useCallback(
    (event) => {
      if (!isHijacking) return;

      event.preventDefault();
      
      const now = Date.now();
      const deltaTime = now - lastTime.current;
      lastTime.current = now;

      // Reduced sensitivity for slower, more controlled scrolling
      const scrollSpeed = event.deltaY * 0.15;
      velocity.current += scrollSpeed;

      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(applyMomentum);
      }
    },
    [isHijacking, applyMomentum]
  );

  // Touch scrolling with velocity
  const touchStartY = useRef(null);
  const isTouchingContainer = useRef(false);
  const lastTouchY = useRef(null);
  const touchVelocities = useRef([]);

  const handleTouchStart = useCallback(
    (e) => {
      // Check if touch is within the scroll container
      if (scrollContainerRef.current) {
        const rect = scrollContainerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const isInside =
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom;

        if (isInside) {
          touchStartY.current = touch.clientY;
          lastTouchY.current = touch.clientY;
          isTouchingContainer.current = true;
          touchVelocities.current = [];
          velocity.current = 0;
          lastTime.current = Date.now();
          enableHijacking();
        } else {
          isTouchingContainer.current = false;
        }
      }
    },
    [enableHijacking]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isTouchingContainer.current || !isHijacking || touchStartY.current === null) return;

      e.preventDefault();
      
      const now = Date.now();
      const touch = e.touches[0];
      const currentY = touch.clientY;
      
      if (lastTouchY.current !== null) {
        const deltaY = lastTouchY.current - currentY;
        const deltaTime = now - lastTime.current;
        
        if (deltaTime > 0) {
          const instantVelocity = deltaY / deltaTime * 16;
          touchVelocities.current.push(instantVelocity);
          
          // Keep only last 5 velocities for averaging
          if (touchVelocities.current.length > 5) {
            touchVelocities.current.shift();
          }
        }
        
        // Reduced sensitivity for slower, more controlled scrolling
        accumulatedDelta.current += deltaY * 0.3;
        
        const scrollThreshold = lineHeight;
        
        if (Math.abs(accumulatedDelta.current) >= scrollThreshold) {
          const direction = accumulatedDelta.current > 0 ? 1 : -1;
          
          setCurrentIndex((prev) => {
            const nextIndex = prev + direction;
            
            if (nextIndex >= flatText.length || nextIndex < 0) {
              velocity.current = 0;
              accumulatedDelta.current = 0;
              isTouchingContainer.current = false;
              // Don't disable hijacking
              return prev;
            }
            
            accumulatedDelta.current -= direction * scrollThreshold;
            return nextIndex;
          });
        }
      }
      
      lastTouchY.current = currentY;
      lastTime.current = now;
    },
    [isHijacking, lineHeight]
  );

  const handleTouchEnd = useCallback(() => {
    if (touchVelocities.current.length > 0) {
      // Calculate average velocity for momentum with reduced boost
      const avgVelocity = touchVelocities.current.reduce((a, b) => a + b, 0) / touchVelocities.current.length;
      velocity.current = avgVelocity * 0.8; // Reduced boost for slower momentum
      
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(applyMomentum);
      }
    }
    
    touchStartY.current = null;
    lastTouchY.current = null;
    isTouchingContainer.current = false;
    touchVelocities.current = [];
  }, [applyMomentum]);

  return (
    <div className="w-full py-10 bg-black flex flex-col justify-center items-center gap-6 px-4">
      <div className="max-w-full text-center">
        <span className="text-white text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat">
          Our{" "}
          <span className="bg-gradient-to-r from-[#7F39FD] via-[#A462FD] to-[#DA9EFD] bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat">
            Manifesto
          </span>
        </span>
      </div>

      <div className="max-w-lg text-center text-white text-base sm:text-lg md:text-xl font-normal font-poppins">
        This is our collective vision, a declaration of what we stand for and
        why we come together.
      </div>

      <div className="h-10 flex justify-center items-center text-white text-4xl md:text-5xl font-bold font-montserrat">
        “
      </div>
      <div
        className="w-full flex justify-center items-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={scrollContainerRef}
          className="w-full max-w-3xl h-72 relative bg-slate-900 rounded-[20px] overflow-hidden flex items-center justify-center px-2 sm:px-6 cursor-pointer select-none"
        >
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(calc(50% - ${
                lineOffsets[currentIndex] + lineHeight / 2
              }px))`,
            }}
            onWheel={handleWheel}
            onMouseEnter={enableHijacking}
            onMouseLeave={disableHijacking}
          >
            {flatText.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-center transition-all duration-300 text-center will-change-transform
                ${
                  index === currentIndex
                    ? "text-violet-400 font-bold font-poppins scale-105 opacity-100"
                    : "text-white opacity-40 font-normal font-poppins scale-95"
                }`}
                style={{
                  fontSize: "16px",
                  minHeight: `${lineHeight}px`,
                  lineHeight: "1.4",
                  marginBottom:
                    index < flatText.length - 1 &&
                    flatText[index + 1].section !== item.section
                      ? `${sectionGap}px`
                      : "0px",
                }}
              >
                {item.line}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-10 flex justify-center items-center rotate-180 text-white text-4xl md:text-5xl font-bold font-montserrat">
        “
      </div>

      <div className="max-w-lg text-center text-white text-base sm:text-lg md:text-xl font-normal font-poppins">
        Together, we turn these words into action and shape the future.
      </div>
    </div>
  );
};