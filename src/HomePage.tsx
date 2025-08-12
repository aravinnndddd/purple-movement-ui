import { useEffect, useRef } from "react";
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
import JoinUsButton from "./components/JoinUsButton";
// import { LogoSlider } from "./components/LogoSlider/logoSlider";

gsap.registerPlugin(ScrollTrigger);

export const HomePage = ({
  onJoinUs,
}: // value,
// update,
{
  onJoinUs: () => void;
  // value: number | undefined;
  // update: (value: number) => void;
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
    <div className="w-full overflow-x-hidden bg-[#111111]" ref={heroRef}>
      <Navbar />

      {/* <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-[30vw]  h-[30vh] object-contain z-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

     
      <video
        autoPlay
        loop
        muted
        className="absolute bottom-0  right-0 w-[30vw] h-[30vh] object-contain z-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </video> */}

      <div
        className="z-10 h-[100vh] flex flex-col bg-[#111111] items-center justify-center"
        id="home"
      >
        <div className="hero-title leading-none text-[35px] uppercase text-center font-bold  text-white  ">
          <p className="mb-[10px]"> We Are The</p>
          <p className="flex flex-row justify-center uppercase bg-clip-text text-transparent text-[80px] bg-gradient-to-tr from-[#8E00FF]   to-[#D8B0FA] [font-[Montesrrat] ">
            Purple Movement
          </p>
        </div>
        <p className="hero-subtitle text-white/75 text-[20px] mt-[15px] text-center  w-[676.01px]">
          Rebuilding how India learns—Beyond Borders, Beyond Syllabus, beyond
          gatekeepers, beyond paywalls.
        </p>
        {/* <div className="hero-counter">
          <Counter value={value} update={update} />
        </div> */}
        <JoinUsButton
          onClick={onJoinUs}
          className=" items-center text-[#FFF9F9] uppercase "
        />
        {/* <div className="logo-slider absolute bottom-0 px-[20px] mb-[30px] bg-white/5 backdrop-blur-sm">
          <LogoSlider />
        </div> */}
      </div>

      <div className="fade-section " id="about">
        <WhyNow />
      </div>
      <div className=" fade-section" id="verse">
        <Muverse />
      </div>
      <div className=" fade-section" id="vision">
        <VisionAndImpact />
      </div>
      <div className=" fade-section" id="manifesto">
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
