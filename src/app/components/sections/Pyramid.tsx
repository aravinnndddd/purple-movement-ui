"use client";

import CardSwap, { Card } from "@/components/CardSwap";
import Image from "next/image";
import { useRef } from "react";

// import Image from "next/image";
// import { useState, useRef } from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const Pyramid = () => {
  // const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  // const containerRef = useRef<HTMLDivElement>(null);

  // // Define the image source based on hovered section
  // const getImageSrc = () => {
  //   switch (hoveredSection) {
  //     case 'top':
  //       return '/svgs/pyramid-t.svg';
  //     case 'bottom-left':
  //       return '/svgs/pyramid-bl.svg';
  //     case 'bottom-right':
  //       return '/svgs/pyramid-br.svg';
  //     default:
  //       return '/svgs/pyramid.svg';
  //   }
  // };

  const containerRef = useRef<HTMLDivElement>(null);

  // Define the image source based on hovered section
  // const getImageSrc = () => {
  //   switch (hoveredSection) {
  //     case "top":
  //       return "/svgs/pyramid-t.svg";
  //     case "bottom-left":
  //       return "/svgs/pyramid-bl.svg";
  //     case "bottom-right":
  //       return "/svgs/pyramid-br.svg";
  //     default:
  //       return "/svgs/pyramid.svg";
  //   }
  // };

  return (
    <div className="w-full bg-black flex h-[90vh]  lg:h-[70vh] lg:items-center  relative">
      <div
        ref={containerRef}
        className="relative md:top-10 md:left-20 -top-20 w-[280px] sm:w-[360px] md:w-[700px] aspect-square z-10"
      >
        <Image
          src="/svgs/pyramid.svg"
          alt="Pyramid"
          fill
          className="object-contain transition-opacity duration-300 ease-in-out"
          priority
        />
      </div>
      <CardSwap
        cardDistance={60}
        verticalDistance={70}
        delay={3000}
        pauseOnHover={true}
      >
        <Card className="">
          <h3 className=" text-[#6f00cd] text-[35px] font-bold border-b-1 mx-5 border-purple-500 pb-1 mb-4">
            Beyond Syllabus
          </h3>
          <p className="pl-5 text-[22px]">
            Empowering curious minds to turn ideas into real-world skills,
            building the confidence to grow and create without limits.
          </p>
        </Card>
        <Card className="">
          <h3 className="  text-[#6f00cd] text-[35px] font-bold border-b-1 mx-5 border-purple-500 pb-1 mb-4">
            Beyond Gatekeepers
          </h3>
          <p className="pl-5 text-[22px]">
            Empowering curious minds to turn ideas into real-world skills,
            building the confidence to grow and create without limits.
          </p>
        </Card>
        <Card className="">
          <h3 className="  text-[#6f00cd] text-[35px] font-bold border-b-1 mx-5 border-purple-500 pb-1 mb-4">
            Beyond Borders
          </h3>
          <p className="pl-5 text-[22px]">
            Empowering curious minds to turn ideas into real-world skills,
            building the confidence to grow and create without limits.
          </p>
        </Card>
      </CardSwap>
    </div>
  );
};

export default Pyramid;
