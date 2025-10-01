"use client";

import Image from "next/image";
import { useState } from "react";

const FAQs = [
  {
    question: "What is The Purple Movement?",
    answer:
      "We believe talent should never be locked behind privilege. We build platforms and networks where opportunities come from skills and proof of work, not background.",
  },
  {
    question: "Who can join?",
    answer:
      "Everyone. If you're a student, teacher, professional, startup, or policymaker — we welcome you to learn, share, and grow with us.",
  },
  {
    question: "What does 'Beyond Syllabus' mean?",
    answer:
      "It means going beyond textbooks — diving into curiosity, skills, collaboration, and proof of work that truly prepare you for the real world.",
  },
  {
    question: "What does 'Beyond Gatekeepers' mean?",
    answer:
      "We believe talent should never be locked behind privilege. We build platforms and networks where opportunities come from skills and proof of work, not background.",
  },
  {
    question: "What does 'Beyond Borders' mean?",
    answer:
      "Knowledge has no geography. We connect individuals, startups, and organizations across the world to learn, share, and solve problems without limits.",
  },
  {
    question: "How can I contribute?",
    answer: "Just hit the Join Us button — that's where it begins.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-14 sm:py-20 bg-black flex flex-col justify-center items-center gap-6 sm:gap-10">
      {/* Title */}
      <div className="text-center text-white text-2xl sm:text-4xl md:text-5xl font-semibold font-montserrat">
        FAQ
      </div>

      {/* Underline */}
      <div className="w-20 sm:w-32 md:w-44 h-0 outline outline-2 -mt-2 outline-offset-[-1px] outline-purple-600" />

      {/* Subtitle */}
      <div className="w-full max-w-3xl text-center text-white/75 text-sm sm:text-base md:text-lg font-normal font-poppins px-2 sm:px-0">
        From creative challenges to impactful experiences, our events are
        designed to inspire, push boundaries, and open doors to new
        opportunities.
      </div>

      {/* FAQ List */}
      <div className="w-full max-w-3xl flex flex-col gap-4">
        {FAQs.map((faq, index) => (
          <div
            key={index}
            className="w-full rounded-2xl overflow-hidden bg-[linear-gradient(to_right,#7E22CE_0px,#7E22CE_12px,#0F172A_12px,#0F172A_100%)] transition-all duration-300 ease-in-out"
          >
            {/* Question block */}
            <div
              className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 cursor-pointer text-white"
              onClick={() => toggleFAQ(index)}
            >
              <div className="text-left text-sm sm:text-base md:text-lg pl-4 sm:pl-6 font-semibold font-montserrat ml-2">
                {faq.question}
              </div>
              <Image
                src={
                  openIndex === index
                    ? "/svgs/minusCircle.svg"
                    : "/svgs/plusCircle.svg"
                }
                alt="Toggle Icon"
                width={24}
                height={24}
                className="opacity-60 hover:opacity-80 transition-opacity"
              />
            </div>

            {/* Answer block */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border-t border-white/30 ml-10 mr-20" />
              <div className="px-4 sm:px-6 pb-5 pt-3 text-white/75 text-sm sm:text-base font-poppins ml-7 mr-20">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};