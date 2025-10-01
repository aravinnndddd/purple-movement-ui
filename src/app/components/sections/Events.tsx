"use client";

import Image from "next/image";

// const events = [
//   {
//     title: "Enter the Flow",
//     imgPath: "/images/flow.png" ,
//     desc: "A flash UI/UX hackathon where creativity meets speedy.",
//   },
//   {
//     title: "Saddle Up",
//     imgPath: "/images/saddle.jpg" ,
//     desc: "A skill-building event series to gear you up for opportunities.",
//   },
//   {
//     title: "Stay Tuned"
//   }
// ]

export const Events = () => {
  return (
    <div
      className="w-full py-16 bg-black flex flex-col justify-center items-center gap-8 px-4"
      id="events"
    >
      {/* Title */}
      <div className="text-center text-white text-2xl sm:text-4xl md:text-5xl font-semibold font-montserrat">
        Events
      </div>

      {/* Subtitle */}
      <div className="max-w-2xl md:max-w-4xl text-center text-white/75 text-sm sm:text-base md:text-lg font-normal font-poppins px-2 sm:px-0">
        From creative challenges to impactful experiences, our events are
        designed to inspire, push boundaries, and open doors to new
        opportunities.
      </div>

      {/* Events Container */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 mt-8 w-full max-w-[1400px] px-2 sm:px-0">
        {/* Card - Enter the Flow */}
        <div className="group w-full max-w-sm md:w-72 md:h-80 opacity-100 md:opacity-25 bg-gray-900 rounded-lg shadow-md shadow-black/25 border border-white/50 relative md:-mr-10 hover:opacity-100 hover:scale-105 transition-all duration-300 z-10 group-hover:z-30 cursor-pointer">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-gray-900/50" />
            <div className="flex flex-col items-center justify-center h-full px-4 pt-6 pb-16">
              <div className="mb-6 sm:mb-8">
                <Image
                  src="/images/flow.png"
                  alt="Enter the Flow"
                  width={160}
                  height={130}
                  className="object-contain rounded-lg border border-white/50"
                />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-white text-base sm:text-lg font-semibold font-montserrat mb-1">
                Enter the Flow
              </div>
              <div className="text-white/90 md:text-white/75 text-xs sm:text-sm font-poppins">
                A flash UI/UX hackathon where creativity meets speedy.
              </div>
            </div>
            <div className="absolute bottom-2 right-6">
              <Image
                src="/svgs/arrow.svg"
                alt="Arrow"
                width={22}
                height={22}
                className="md:opacity-60  opacity-100"
              />
            </div>
          </div>
        </div>

        {/* Card - Saddle */}
        <div className="group w-full max-w-md md:w-96 md:h-96 bg-gray-900 rounded-lg shadow-md shadow-black/25 border border-white/50 relative z-20 hover:scale-105 transition-transform duration-300 cursor-pointer">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <div className="flex flex-col items-center justify-center h-full px-4 pt-6 pb-20 z-0 relative">
              <div className="mb-6 sm:mb-10">
                <Image
                  src="/images/saddle.jpg"
                  alt="Saddle Event"
                  width={180}
                  height={200}
                  className="object-contain rounded-lg border border-white/50"
                />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="text-white text-lg sm:text-xl font-bold font-montserrat mb-1">
                Saddle
              </div>
              <div className="text-white/90 text-sm sm:text-base font-poppins leading-snug">
                A skill-building event series to gear you up for opportunities.
              </div>
            </div>
            <div className="absolute bottom-2 right-6 z-20">
              <Image
                src="/svgs/arrow.svg"
                alt="Arrow"
                width={24}
                height={24}
                className="opacity-100"
              />
            </div>
          </div>
        </div>

        {/* Card - Stay Tuned */}
        <div className="group w-full max-w-sm md:w-72 md:h-80 opacity-100 md:opacity-25 bg-gray-900 rounded-lg shadow-md shadow-black/25 border border-white/50 flex flex-col items-center justify-center relative hover:opacity-100 hover:scale-105 transition duration-300 md:-ml-10 z-10 group-hover:z-30 cursor-pointer p-5 sm:p-6">
          <div className="text-center text-white/70 text-base sm:text-xl font-semibold font-montserrat">
            Stay Tuned...
          </div>
          <div className="absolute bottom-2 right-6">
            <Image
              src="/svgs/arrow.svg"
              alt="Arrow"
              width={22}
              height={22}
              className="opacity-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};