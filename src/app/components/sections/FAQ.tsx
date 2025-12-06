"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const FAQs: FAQItem[] = [
  {
    question: "What is The Purple Movement?",
    answer:
      `The Purple Movement is where curious, purpose-driven people come together to explore big 
ideas, solve real problems, and spark meaningful change. 
A barrier-free community where your skills actually matter.`,
  },
  {
    question: "Who can join?",
    answer:
     `If you’re driven by purpose, you belong here. No limitations. A place to connect and grow alongside 
others on the same path. `,
  },
  {
    question: "What does 'Beyond Syllabus' mean?",
    answer:
      `Beyond Syllabus is where learning stops being boring. It is about picking up real skills, trying 
new things, and exploring what actually excites you, not just what is written in textbooks.`,
  },
  {
    question: "What does 'Beyond Gatekeepers' mean?",
    answer:
      `Beyond Gatekeepers gives everyone a real chance to grow. By lifting each other up, we create a space 
where anyone with purpose can connect, contribute, and move forward without limitations.`,
  },
  {
    question: "What does 'Beyond Borders' mean?",
    answer:
     `Beyond Borders is all about breaking limits. It helps people connect, share ideas, and 
access opportunities without being held back by geography, systems, or labels. It’s a 
space where ambition isn’t boxed in and you can dream big, build big, and grow 
beyond any boundary. `,
  },
  {
    question: "How can I contribute?",
    answer: (
      <>
        Click{" "}
        <Link href="/join" className="text-purple-400 hover:text-purple-300 transition-colors">
          Join Us
        </Link>
        {" "}that&apos;s all it takes to get started.
      </>
    ),
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

      {/* Subtitle */}
      <div className="w-full max-w-3xl text-center text-white/75 text-sm sm:text-base md:text-lg font-normal font-poppins px-2 sm:px-0">
        Got questions? We&apos;ve got answers. Here are some of the most common things people ask 
about the Purple Movement. 
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