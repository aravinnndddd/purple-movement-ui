"use client";

import Image from "next/image";

interface StepOneProps {
  selectedOption: string | null;
  onCardClick: (optionId: string) => void;
}

export default function StepOne({ selectedOption, onCardClick }: StepOneProps) {
  const options = [
    {
      id: "individual",
      label: "Individual",
      text: "Students, creators, and entrepreneurs collaborating, contributing, and networking to drive meaningful impact together.",
      svgPath: "/svgs/ind.svg",
    },
    {
      id: "organization",
      label: "Organization",
      text: "Nonprofit organizations, startups, universities, and research labs enabling learning, fostering innovation, and creating scalable solutions.",
      svgPath: "/svgs/org.svg",
    },
    {
      id: "government",
      label: "Government",
      text: "Government departments, policymakers, and public institutions shaping programs, fostering the ecosystem, and enabling impactful collaboration.",
      svgPath: "/svgs/gov.svg",
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 w-full">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-montserrat capitalize">
          What Defines You?
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-normal font-poppins text-white/80 capitalize">
          Understanding the things that define you.
        </p>
      </div>

      {/* Selection Cards */}
      <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onCardClick(option.id)}
            className={`w-[90%] xs:w-64 sm:w-60 md:w-64 h-32 xs:h-40 sm:h-64 md:h-72 relative bg-slate-900/75 rounded-xl shadow-lg border   group overflow-hidden cursor-pointer transform transition-transform duration-300 ease-out hover:scale-110 hover:shadow-violet-500/30 hover:shadow-lg ${
              selectedOption === option.id
                ? "border-violet-700 bg-slate-800/90"
                : "border-black/40 hover:border-violet-700/50"
            }`}
          >
            {/* Icon */}
            <div className="absolute top-6 left-5 w-10 h-10  rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src={option.svgPath}
                alt={option.label}
                width={24}
                height={24}
                color="white"
                style={{ height: "auto" }}
              />
            </div>

            {/* Default Label */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0 px-2 text-center">
              <span className="text-lg sm:text-xl font-bold font-montserrat text-white">
                {option.label}
              </span>
            </div>

            {/* Hover Text */}
            <div className="absolute  inset-0 flex items-start justify-start p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full text-left text-white/75 text-xs sm:text-sm font-normal font-poppins capitalize mt-14 overflow-hidden text-ellipsis leading-snug">
                {option.text}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
