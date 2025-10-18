"use client";

import React, { useState, useRef, useCallback } from "react";

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

const flatText = sections.flatMap((section, sectionIndex) =>
  section.map((line) => ({
    line,
    section: sectionIndex,
  }))
);

export const Manifesto = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHijacking, setIsHijacking] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const accumulatedDelta = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const velocity = useRef(0);
  const lastTime = useRef(Date.now());
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useRef(false);

  const lineHeight = 35;
  const sectionGap = 40;

  const lineOffsets = flatText.map((item, i) => {
    const section = item.section;
    const linesBefore = i;
    const gapsBefore = section;
    return linesBefore * lineHeight + gapsBefore * sectionGap;
  });

  // Detect mobile device
  const detectMobile = useCallback(() => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  }, []);

  // Auto-scroll functionality for mobile
  const startAutoScroll = useCallback(() => {
    if (isAutoScrolling) return;

    setIsAutoScrolling(true);
    let currentAutoIndex = currentIndex;

    const scrollNext = () => {
      currentAutoIndex = (currentAutoIndex + 1) % flatText.length;
      setCurrentIndex(currentAutoIndex);

      if (currentAutoIndex === 0) {
        // Reached the end, stop auto-scrolling
        setIsAutoScrolling(false);
        return;
      }

      // Smooth transition with shorter intervals for better flow
      autoScrollTimer.current = setTimeout(scrollNext, 1500); // 1.5 seconds per line
    };

    // Start immediately for smoother experience
    autoScrollTimer.current = setTimeout(scrollNext, 1500);
  }, [currentIndex, isAutoScrolling, flatText.length]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimer.current) {
      clearTimeout(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
    setIsAutoScrolling(false);
  }, []);

  // Enable hijacking when the user hovers or touches the container
  const enableHijacking = useCallback(() => {
    if (!isHijacking && !isMobile.current) {
      setIsHijacking(true);
      // Prevent body scrolling when hijacking is active on desktop
      document.body.style.overflow = "hidden";
    }
  }, [isHijacking]);

  const disableHijacking = useCallback(() => {
    if (isHijacking && !isMobile.current) {
      setIsHijacking(false);
      // Restore body scrolling when hijacking is disabled
      document.body.style.overflow = "auto";
      // Don't reset velocity and accumulated delta here - let momentum finish
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    }
  }, [isHijacking]);

  // Mouse enter handler for desktop
  const handleMouseEnter = useCallback(() => {
    isMobile.current = detectMobile();
    if (!isMobile.current) {
      enableHijacking();
    }
  }, [detectMobile, enableHijacking]);

  // Mouse leave handler for desktop
  const handleMouseLeave = useCallback(() => {
    if (!isMobile.current) {
      disableHijacking();
    }
  }, [disableHijacking]);

  // Apply momentum and smooth scrolling
  const applyMomentum = useCallback(() => {
    const friction = 0.85; // Slightly less friction for more responsive feel
    const threshold = 0.3; // Lower threshold for more responsive scrolling

    if (Math.abs(velocity.current) > threshold) {
      accumulatedDelta.current += velocity.current;
      velocity.current *= friction;

      const scrollThreshold = lineHeight * 0.6; // Lower threshold for more responsive scrolling

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
            // Don't disable hijacking here - keep it active while mouse is in container
            return prev;
          }

          if (nextIndex < 0) {
            velocity.current = 0;
            accumulatedDelta.current = 0;
            if (animationFrameId.current) {
              cancelAnimationFrame(animationFrameId.current);
              animationFrameId.current = null;
            }
            // Don't disable hijacking here - keep it active while mouse is in container
            return prev;
          }

          accumulatedDelta.current -= direction * scrollThreshold;
          return nextIndex;
        });
      }

      animationFrameId.current = requestAnimationFrame(applyMomentum);
    } else {
      velocity.current = 0;
      accumulatedDelta.current = 0;
      animationFrameId.current = null;
      // Don't disable hijacking here - keep it active while mouse is in container
    }
  }, [lineHeight]);

  // Wheel scrolling with velocity
  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      // Ensure we're on desktop and enable hijacking if not already active
      if (isMobile.current) return;

      if (!isHijacking) {
        enableHijacking();
      }

      event.preventDefault();

      lastTime.current = Date.now();

      // More responsive scrolling for better user experience
      const scrollSpeed = event.deltaY * 0.3;
      velocity.current += scrollSpeed;

      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(applyMomentum);
      }
    },
    [isHijacking, applyMomentum, enableHijacking]
  );

  // Touch scrolling with velocity
  const touchStartY = useRef<number | null>(null);
  const isTouchingContainer = useRef(false);
  const lastTouchY = useRef<number | null>(null);
  const touchVelocities = useRef<number[]>([]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      // Set mobile flag
      isMobile.current = true;

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
          accumulatedDelta.current = 0;
          lastTime.current = Date.now();
          // Don't enable hijacking for mobile - we'll use auto-scroll instead
        } else {
          isTouchingContainer.current = false;
        }
      }
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isTouchingContainer.current || touchStartY.current === null) return;

      const touch = e.touches[0];
      const currentY = touch.clientY;

      // Check if still inside container
      if (scrollContainerRef.current) {
        const rect = scrollContainerRef.current.getBoundingClientRect();
        const isStillInside =
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom;

        if (!isStillInside) {
          // Left the container, release everything
          touchStartY.current = null;
          lastTouchY.current = null;
          isTouchingContainer.current = false;
          touchVelocities.current = [];
          velocity.current = 0;
          accumulatedDelta.current = 0;
          disableHijacking();
          return;
        }
      }

      // Only prevent default if we're actively hijacking
      if (isHijacking) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (!isHijacking) {
        enableHijacking();
      }

      const now = Date.now();

      if (lastTouchY.current !== null) {
        const deltaY = lastTouchY.current - currentY;
        const deltaTime = now - lastTime.current;

        if (deltaTime > 0) {
          const instantVelocity = (deltaY / deltaTime) * 16;
          touchVelocities.current.push(instantVelocity);

          // Keep only last 5 velocities for averaging
          if (touchVelocities.current.length > 5) {
            touchVelocities.current.shift();
          }
        }

        // Increased sensitivity for smoother feel
        accumulatedDelta.current += deltaY * 0.3;

        const scrollThreshold = lineHeight * 0.6; // Lower threshold for more responsive scrolling

        if (Math.abs(accumulatedDelta.current) >= scrollThreshold) {
          const direction = accumulatedDelta.current > 0 ? 1 : -1;

          setCurrentIndex((prev) => {
            const nextIndex = prev + direction;

            if (nextIndex >= flatText.length || nextIndex < 0) {
              velocity.current = 0;
              accumulatedDelta.current = 0;
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
    [isHijacking, lineHeight, disableHijacking, enableHijacking]
  );

  const handleTouchEnd = useCallback(() => {
    // Check if this was a simple tap (no significant movement)
    const wasSimpleTap =
      touchStartY.current !== null &&
      lastTouchY.current !== null &&
      Math.abs(lastTouchY.current - touchStartY.current) < 10;

    if (wasSimpleTap && isTouchingContainer.current && isMobile.current) {
      // For mobile: start auto-scroll on tap
      stopAutoScroll(); // Stop any existing auto-scroll
      // Small delay to ensure smooth transition
      setTimeout(() => {
        startAutoScroll(); // Start new auto-scroll
      }, 100);
    } else if (
      wasSimpleTap &&
      isTouchingContainer.current &&
      !isMobile.current
    ) {
      // For desktop: just advance one line
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= flatText.length ? 0 : nextIndex;
      });
    } else if (
      touchVelocities.current.length > 0 &&
      isTouchingContainer.current &&
      !isMobile.current
    ) {
      // Apply momentum based on velocity (desktop only)
      const avgVelocity =
        touchVelocities.current.reduce((a, b) => a + b, 0) /
        touchVelocities.current.length;
      velocity.current = avgVelocity * 1.2; // Boost for better momentum feel

      if (!animationFrameId.current && Math.abs(velocity.current) > 0.5) {
        animationFrameId.current = requestAnimationFrame(applyMomentum);
      }
    }

    // Clean up touch state
    touchStartY.current = null;
    lastTouchY.current = null;
    isTouchingContainer.current = false;
    touchVelocities.current = [];

    // Don't disable hijacking immediately - let momentum finish
  }, [applyMomentum, flatText.length, startAutoScroll, stopAutoScroll]);

  // Handle click for desktop users
  const handleClick = useCallback(() => {
    if (!isMobile.current) {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= flatText.length ? 0 : nextIndex; // Loop back to start
      });
    }
  }, [flatText.length]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (autoScrollTimer.current) {
        clearTimeout(autoScrollTimer.current);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      // Restore body scroll on unmount
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-full py-10 z-[999] bg-black flex flex-col justify-center items-center gap-6 px-4">
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
        onTouchCancel={handleTouchEnd}
      >
        <div
          ref={scrollContainerRef}
          className="w-full max-w-3xl h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] relative bg-white/10 backdrop-blur-sm rounded-[20px] overflow-hidden flex items-center justify-center px-2 sm:px-6 cursor-pointer select-none border border-white/10 shadow-xl"
          onClick={handleClick}
        >
          <div
            className="transition-transform duration-200 ease-out"
            style={{
              transform: `translateY(calc(50% - ${
                lineOffsets[currentIndex] + lineHeight / 2
              }px))`,
            }}
            onWheel={handleWheel}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {flatText.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-center transition-all duration-300 text-center will-change-transform text-sm sm:text-base md:text-lg
                ${
                  index === currentIndex
                    ? "text-violet-400 font-bold font-poppins scale-105 opacity-100"
                    : "text-white opacity-40 font-normal font-poppins scale-95"
                }`}
                style={{
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
