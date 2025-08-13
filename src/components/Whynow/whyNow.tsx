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
    <div ref={sectionRef} className=" bg-[#101010] ">
      <div className=" flex flex-col md:flex-row justify-center items-center why-text">
        <div className="text-white justify-center flex flex-col items-center  ">
          <h2 className="text-center w-[550px] h-[98px] font-bold text-[40px] leading-[45px]  mb-[10px]">
            Where{" "}
            <span className="text-purple-600 m-0 p-0  ">Purposeful People</span>{" "}
            Begin a Mission
          </h2>
          <p className="text-center w-[896px] h-[108px] text-[18px] text-white/75">
            Purple is a movement that bridges the energy of youth with the
            wisdom of experts to reimagine how knowledge flows. It breaks away
            from outdated systems, enabling students to learn beyond textbooks,
            borders, and gatekeepers. By uniting purpose-driven people, Purple
            creates a space for open, fast, and practical learning that’s built
            for today’s world.
          </p>
        </div>
      </div>

      <div className="w-full h-[90vh] relative">
        <img
          src="./seperater.png"
          className="w-full blend absolute"
          alt="seperater"
        />
        <div className=" grid grid-cols-1 md:grid-cols-3 top-[25vh] gap-[20px] -translate-x-1/2 translate-y-1/2 left-1/2 absolute w-[1080px] ">
          {cardText.map((text, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className=" rounded-[10px] text-white text-center flex items-center justify-center w-[347px] h-[246px]  shadow-lg font-poppins text-[18px] leading-[1.4] bg-[#000000]/30"
            >
              <p className="w-[238.81px]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
