import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const WhyNow = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const cardText = [
    " Connecting people and ideas across countries and cultures.",
    "Opening access to knowledge without barriers or approvals.",
    "Equipping you with skills and experiences beyond textbooks.",
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
      className=" bg-gradient-to-b from-[#101010] to-[#000000]"
    >
      <div className=" flex flex-col md:h-[50vh] md:static absolute bottom-[1px] md:flex-row justify-center items-end  md:why-text">
        <div className="text-white justify-center flex flex-col items-center  ">
          <h2 className="text-center w-[318.72px] md:w-[550px] md:h-[98px] h-[60px] font-semibold text-[25px] md:text-[40px] leading-[30px] md:leading-[45px]  mb-[10px]">
            Where{" "}
            <span className="text-purple-600 m-0 p-0  ">Purposeful People</span>{" "}
            Begin a Mission
          </h2>
          <p className="text-center md:w-[896px] w-fit px-5 h-[108px] text-[10px] md:text-[18px] text-white/75">
            Purple Movement connects the energy of youth with the wisdom of
            experts to break barriers in learning and creation. By removing
            limits of cost, access, and geography, we open up fast, practical,
            and inclusive ways for people to share ideas, gain skills, and build
            real-world solutions.
          </p>
        </div>
      </div>

      <div className="w-full h-[120vh]  md:h-[90vh] relative">
        <img
          src="./seperater.png"
          className="w-full blend absolute"
          alt="seperater"
        />
        <div className=" grid grid-cols-1 md:grid-cols-3  w-[330px] top-[10vh] md:top-[25vh] gap-[20px] -translate-x-1/2 md:translate-y-1/2 left-1/2   mx-auto   absolute md:w-[1080px] mb-5 ">
          {cardText.map((text, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className=" rounded-[10px] text-white/75 border-1 border-white/20 text-center flex items-center justify-center w-[330px] md:px-1 px-2 md:w-[347px] h-[246px]  shadow-lg font-poppins text-[18px] leading-[1.4] bg-[#000000]/30"
            >
              <p className="w-[238.81px]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
