import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const WhyNow = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const cardText = [
    "Real-time learning from practitioners—fast, relevant, and future-ready.",
    "Open, community-powered access to knowledge without paywalls or gatekeepers.",
    "Connecting purposeful people to co-create and grow through shared missions.",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text section
      gsap.from(".why-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".why-text",
          start: "top 80%",
        },
      });

      // Animate each card
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // Clean up animations
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-20 px-6 bg-[#0E001B]/50 mx-auto md:w-[90%] w-[95%] rounded-lg"
    >
      <div className="px-2 md:px-20 my-20 flex flex-col md:flex-row justify-center items-center why-text">
        <div>
          <h2 className="text-white text-3xl font-[Montesrrat] text-left font-bold mb-10 leading-snug text-pretty">
            Where <span className="text-purple-600">Purposeful People</span>{" "}
            Begin a Mission
          </h2>
          <p className="text-left text-white">
            Purple is a movement that bridges the energy of youth with the
            wisdom of experts to reimagine how knowledge flows. It breaks away
            from outdated systems, enabling students to learn beyond textbooks,
            borders, and gatekeepers. By uniting purpose-driven people, Purple
            creates a space for open, fast, and practical learning that’s built
            for today’s world.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-16 font-poppins">
          Why Now?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {cardText.map((text, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="backdrop-blur-sm rounded-lg text-white text-center flex items-center justify-center w-[285px] h-[237px] p-5 shadow-lg font-poppins text-[18px] leading-[1.4] bg-[#0E001B]/50"
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
