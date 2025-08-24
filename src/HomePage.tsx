
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Footer } from "./components/Footer/footer";
import Manifesto from "./components/ManifestoPage/manifestoPage";
import { Navbar } from "./components/Navbar/navbar";
import { Muverse } from "./components/muVresePage/muVersePage";
import { WhyNow } from "./components/Whynow/whyNow";
import { VisionAndImpact } from "./components/VisionAndImpact/vissionAndImpact";
import Form from "./components/Form/form";
import { Hero } from "./components/Hero/heroPage";

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onJoinUs: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onJoinUs }) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [viewJoinModal, setViewJoinModal] = useState(false);

  const handleOpenJoinModal = () => setViewJoinModal(true);
  const handleCloseJoinModal = () => setViewJoinModal(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });

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

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar />

      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 md:w-[30vw] w-[50vw] h-[40vh] object-contain z-0"
      >
        <source src="/bg-left.mp4" type="video/mp4" />
      </video>

      <video
        autoPlay
        loop
        muted
        className="absolute bottom-[15vh] md:bottom-0 right-0 w-[50vw] md:w-[30vw] h-[40vh] object-contain z-0"
      >
        <source src="/bg-right.mp4" type="video/mp4" />
      </video>

      <div
        ref={heroRef}
        className="z-10 h-[100vh] flex flex-col bg-[#101010] items-center justify-center"
        id="home"
      >
  <Form isOpen={viewJoinModal} onClose={handleCloseJoinModal} />
  <Hero onJoinUs={onJoinUs || handleOpenJoinModal} />
      </div>

      <div className="fade-section" id="about">
        <WhyNow />
      </div>

      <div className="fade-section" id="manifesto">
        <Manifesto />
      </div>
      <div className="fade-section" id="vision">
        <VisionAndImpact />
      </div>
      <div className="fade-section" id="verse">
        <Muverse onJoinUs={onJoinUs || handleOpenJoinModal} />
      </div>
      <Footer />
    </div>
  );
};