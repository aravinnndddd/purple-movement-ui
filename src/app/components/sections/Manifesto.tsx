"use client";

import { useState, useRef, useCallback, useEffect } from "react";

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

const flatText: { line: string; section: number }[] = sections.flatMap(
  (section, sectionIndex) =>
    section.map((line) => ({
      line,
      section: sectionIndex,
    }))
);

export const Manifesto = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHijacking, setIsHijacking] = useState(false);
  const isScrollingRef = useRef(false);

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
    }
  }, [isHijacking]);

  // Wheel scrolling
  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      if (!isHijacking) return;

      event.preventDefault();
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      setTimeout(() => (isScrollingRef.current = false), 200);

      const direction = event.deltaY > 0 ? 1 : -1;

      setCurrentIndex((prev) => {
        const nextIndex = prev + direction;

        if (nextIndex >= flatText.length) {
          disableHijacking(); // Release scroll at the end
          return prev;
        }

        if (nextIndex < 0) {
          disableHijacking(); // Release scroll at the start
          return prev;
        }

        return nextIndex;
      });
    },
    [isHijacking, disableHijacking]
  );

  // Touch scrolling
  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      enableHijacking();
    },
    [enableHijacking]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isHijacking || touchStartY.current === null) return;

      e.preventDefault();
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 20) {
        if (isScrollingRef.current) return;
        isScrollingRef.current = true;
        setTimeout(() => (isScrollingRef.current = false), 200);

        setCurrentIndex((prev) => {
          const nextIndex = prev + (deltaY > 0 ? 1 : -1);

          if (nextIndex >= flatText.length || nextIndex < 0) {
            disableHijacking(); // Release scroll
            return prev;
          }

          return nextIndex;
        });

        touchStartY.current = touchEndY;
      }
    },
    [isHijacking, disableHijacking]
  );

  const handleTouchEnd = useCallback(() => {
    touchStartY.current = null;
  }, []);

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
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={enableHijacking}
        onMouseLeave={disableHijacking}
      >
        <div className="w-full max-w-3xl h-72 relative bg-slate-900 rounded-[20px] overflow-hidden flex items-center justify-center px-2 sm:px-6 cursor-pointer select-none">
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(calc(50% - ${
                lineOffsets[currentIndex] + lineHeight / 2
              }px))`,
            }}
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
