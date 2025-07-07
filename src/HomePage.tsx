import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgVideo from "./assets/bg.mp4";
import { Footer } from "./components/Footer/footer";
import Manifesto from "./components/ManifestoPage/manifestoPage";
import { Navbar } from "./components/Navbar/navbar";
import { Muverse } from "./components/muVresePage/muVersePage";
import { WhyNow } from "./components/Whynow/whyNow";
import { VisionAndImpact } from "./components/VisionAndImpact/vissionAndImpact";
import Counter from "./components/Counter";
import JoinUsButton from "./components/JoinUsButton";
import { LogoSlider } from "./components/LogoSlider/logoSlider";

gsap.registerPlugin(ScrollTrigger);

export const HomePage = ({
  onJoinUs,
  value,
  update,
}: {
  onJoinUs: () => void;
  value: number | undefined;
  update: (value: number) => void;
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);

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
      gsap.from(".hero-counter", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 1,
        ease: "back.out(1.7)",
      });

      // LogoSlider
      gsap.from(".logo-slider", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power2.out",
      });

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
    <div className="overflow-x-hidden" ref={heroRef}>
      <Navbar onJoinUs={onJoinUs} />

      <div className="fixed w-full -z-10 h-screen overflow-x-hidden">
        <video
          autoPlay
          loop
          muted
          className="fixed inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="p-[250px] right-[-50px] top-[-150px] absolute bg-[#6F00CD]/40 rounded-full blur-[100px]"></div>
        <div className="p-[250px] left-[-90px] bottom-[10px] absolute bg-purple-600/40  rounded-full blur-[100px]"></div>
        <div className="bg-black/50 backdrop-blur-[3.5px] h-full fixed w-full p-10 right-0 top-0"></div>
      </div>

      <div
        className="relative z-10 h-[110vh] flex flex-col items-center justify-center"
        id="home"
      >
        <div className="hero-title bg-clip-text text-transparent bg-gradient-to-tr from-purple-600  to-fuchsia-600 font-[Montesrrat] leading-none md:text-[3rem] text-center font-bold text-[2.5rem]  lg:text-[6rem] ">
          We Are The
          <p className="flex flex-row justify-center">Purple Movement</p>
        </div>
        <p className="hero-subtitle text-white lg:text-[1.2rem] text-[.9rem]  p-3 mt-8 text-center leading-5 ">
          Rebuilding how India learns-Beyond Borders, Beyond Syllabus, Beyond
          Gatekeepers, Beyond Paywalls
        </p>
        <div className="hero-counter">
          <Counter value={value} update={update} />
        </div>
        <JoinUsButton
          onClick={onJoinUs}
          className=" items-center mt-5 md:hidden"
        />
        <div className="logo-slider absolute bottom-0 px-[20px] mb-[30px] bg-white/5 backdrop-blur-sm">
          <LogoSlider />
        </div>
      </div>

      <div className="relative fade-section" id="about">
        <WhyNow />
      </div>
      <div className="relative fade-section" id="verse">
        <Muverse />
      </div>
      <div className="relative fade-section" id="vision">
        <VisionAndImpact />
      </div>
      <div className="relative fade-section" id="manifesto">
        <div className="p-[20px] w-full h-[100vh] absolute bg-gradient-to-br from-purple-700/40 to-transparent blur-[100px]" />
        <Manifesto />
        <div className="text-white items-center flex text-center flex-col h-[50vh] justify-center bg-purple-950/10 md:rounded-[50px] backdrop-blur-md md:w-[90%] md:m-auto mb-10">
          <h1 className="font-extrabold mb-5 lg:text-[2rem] md:text-[1.5rem] text-[1.2rem] text-center">
            A New Way to Learn, Share, <br />
            and Grow Together
          </h1>
          <p className="w-[95%] md:[60%] text-[.8rem] md:text-[1rem] mb-5">
            Be part of a new learning ecosystem that goes beyond outdated
            classrooms and rigid syllabus. Here, students, creators, and mentors
            come together to share real knowledge, build meaningful projects,
            and shape the future of education — together.
          </p>
          <JoinUsButton onClick={onJoinUs} className=" items-center mt-5 " />
        </div>
      </div>

      <Footer />
    </div>
  );
};
