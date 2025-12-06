"use client";

import React from "react";

export const Manifesto = () => {
  return (
    <section className="w-full bg-[#050511] text-white py-20 px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4 relative">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-5xl md:text-7xl font-bold font-montserrat tracking-tighter leading-[0.9] mb-5">
              MANI
              <br />
              FESTO<span className="text-purple-600">.</span>
            </h2>
            <div className="h-1.5 w-16 bg-purple-600 mb-6"></div>
            <p className="text-base text-gray-400 font-poppins max-w-xs leading-relaxed">
              A declaration of our purpose, our power, and the future we are
              building.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold font-montserrat mb-4 text-white">
              The Manifestors
            </h3>
            <p className="text-base md:text-lg text-gray-300 font-poppins font-light leading-relaxed border-l-2 border-purple-900/50 pl-5">
              We are the Manifestors of Change. Not waiting for the future, but
              building it with{" "}
              <span className="text-white font-medium">
                courage, code, creativity, and clarity
              </span>
              . We are the voice of a generation that refuses to settle.
            </p>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold font-montserrat mb-4 text-white">
              The Producers
            </h3>
            <p className="text-base md:text-lg text-gray-300 font-poppins font-light leading-relaxed border-l-2 border-purple-900/50 pl-5">
              We are not consumers of culture;{" "}
              <span className="text-white font-medium">
                we are producers of purpose.
              </span>{" "}
              We break barriers for every young mind daring to dream. We believe
              in ecosystems that empower, not limit.
            </p>
          </div>

          <div className="py-6">
            <p className="text-2xl md:text-4xl font-bold font-montserrat leading-tight text-white">
              In access, not gatekeeping.
              <br />
              In bold visions, not borrowed templates.
            </p>
            <p className="mt-4 text-base md:text-lg text-gray-400 font-poppins">
              We are here to reclaim the narrative. To give confidence to the
              curious, networks to the bold, and direction to the determined.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/10 to-transparent p-6 md:p-10 border border-purple-500/10">
            <h3 className="text-sm md:text-base font-mono text-purple-400 mb-3 uppercase tracking-widest">
              The Movement
            </h3>
            <p className="text-2xl md:text-4xl font-bold font-montserrat text-white leading-tight mb-3">
              This is{" "}
              <span className="bg-gradient-to-r from-[#7F39FD] to-[#DA9EFD] bg-clip-text text-transparent">
                The Purple Movement.
              </span>
            </p>
            <p className="text-base md:text-lg text-gray-300 font-poppins">
              A wave of youth power, purpose, and possibility. A signal that
              change is not coming—it&apos;s already here.
            </p>
          </div>

          <div className="pt-4">
            <p className="text-3xl md:text-5xl font-bold font-montserrat tracking-tight text-white/90 leading-tight">
              We are the energy.
              <br />
              We are the strategy.
              <br />
              We are the spark.
            </p>
            <p className="mt-6 text-xl font-medium text-purple-500 font-poppins flex items-center gap-2 hover:gap-4 transition-all duration-300 cursor-pointer">
              And it starts now
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
