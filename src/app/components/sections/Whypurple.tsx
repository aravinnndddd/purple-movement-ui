"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; 

export const Whypurple = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full px-6 py-16 md:px-12 md:py-24 flex justify-center items-center">
      <div className="max-w-3xl w-full text-center md:text-left">
       
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-white tracking-wide">
            Why Purple?
          </h2>
    
          <div className="h-1 w-24 md:w-32 bg-purple-600 mt-4 rounded-full"></div>
        </div>

        <div className="relative text-white/75 font-poppins text-base md:text-lg leading-relaxed space-y-6 text-left">
          
          <p>
            Purple isn&apos;t just a colour for us, it represents what happens when
            two worlds meet.
          </p>

          <p>
            Red symbolizes the youth: energetic, passionate, curious, and ready
            to create change.
            <br className="hidden md:block" />
            Blue symbolizes experienced professionals: steady, knowledgeable,
            and capable of unlocking new possibilities.
          </p>

         
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-6 pt-4 font-poppins text-white/75">
              <p>
                Today, a gap exists between these two groups. There&apos;s no bridge,
                no shared space where they can learn from each other.
              </p>

              <p>
                We aim to bridge that gap.
              </p>

              <ul className="list-none space-y-2">
                <li>
                  A place where young minds can prove that change is possible
                  and necessary.
                </li>
                <li>
                  A place where experts can guide, inspire, and open doors to
                  new opportunities.
                </li>
                <li>
                  A place where everyone can be themselves, grow together, and
                  lift each other up.
                </li>
              </ul>

              <p>
                When red and blue come together, they create purple&mdash;a symbol of
                collaboration, balance, and the future we want to build.
              </p>

              <p>
                And that thought every person has felt at least once: &quot;If only
                there was a place where I could learn, connect, and be
                understood&quot;
              </p>

              <p className="pt-2">
                we&apos;re here to make that place real.
              </p>
            </div>
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050511] to-transparent pointer-events-none"></div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-2 px-6 py-2 text-white border border-purple-600 rounded-full hover:bg-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#050511]"
          >
            <span className="text-sm font-semibold uppercase tracking-wider">
              {isExpanded ? "Read Less" : "Read More"}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};