import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import bgVideo from "/bg.mp4";
import { Footer } from "./components/Footer/footer";
import Manifesto from "./components/ManifestoPage/manifestoPage";
import { Navbar } from "./components/Navbar/navbar";
import { Muverse } from "./components/muVresePage/muVersePage";
import { WhyNow } from "./components/Whynow/whyNow";
import { VisionAndImpact } from "./components/VisionAndImpact/vissionAndImpact";
// import Counter from "./components/Counter";

import Form from "./components/Form";
import { Hero } from "./components/Hero/heroPage";
// import { LogoSlider } from "./components/LogoSlider/logoSlider";

gsap.registerPlugin(ScrollTrigger);

export const HomePage = ({}: // value,
// update,
{
  onJoinUs: () => void;
  // value: number | undefined;
  // update: (value: number) => void;
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [viewJoinModal, setViewJoinModal] = useState(false);
  const onJoinUs = () => {
    setViewJoinModal(true);
    onJoinUs();
  };
  const onClose = () => {
    setViewJoinModal(false);
    onClose();
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Title Animation
      gsap.from(".hero-title", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Subtitle
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });

      // Counter
      // gsap.from(".hero-counter", {
      //   scale: 0.8,
      //   opacity: 0,
      //   duration: 0.8,
      //   delay: 1,
      //   ease: "back.out(1.7)",
      // });

      // LogoSlider
      // gsap.from(".logo-slider", {
      //   y: 40,
      //   opacity: 0,
      //   duration: 1,
      //   delay: 1.5,
      //   ease: "power2.out",
      // });

      // Scroll-triggered sections
      gsap.utils.toArray(".fade-section").forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    }, heroRef);

    return () => ctx.revert(); // Clean up
  }, []);

  return (
    <div className="w-full overflow-x-hidden  bg-black">
      <Navbar />

      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 md:w-[30vw] w-[50vw]  h-[40vh] object-contain z-0"
      >
        <source src="/bg-left.mp4" type="video/mp4" />
      </video>

      <video
        autoPlay
        loop
        muted
        className="absolute bottom-[15vh] md:bottom-0  right-0 w-[50vw] md:w-[30vw] h-[40vh] object-contain z-0"
      >
        <source src="/bg-right.mp4" type="video/mp4" />
      </video>

      <div
        ref={heroRef}
        className="z-10 h-[100vh] flex flex-col bg-[#101010]  items-center justify-center"
        id="home"
      >
        <Form isOpen={viewJoinModal} onClose={onClose} />
        <Hero onJoinUs={onJoinUs} />
        {/* <div className="logo-slider absolute bottom-0 px-[20px] mb-[30px] bg-white/5 backdrop-blur-sm">
          <LogoSlider />
        </div> */}
      </div>

      <div className="fade-section " id="about">
        <WhyNow />
      </div>

      <div className=" fade-section" id="manifesto">
        <Manifesto />
      </div>
      <div className=" fade-section" id="vision">
        <VisionAndImpact />
      </div>
      <div className=" fade-section" id="verse">
        <Muverse onJoinUs={onJoinUs} />
      </div>
      <Footer />
    </div>
  );
};
