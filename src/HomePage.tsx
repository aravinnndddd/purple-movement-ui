import bgVideo from "./assets/bg.mp4";
import { Footer } from "./components/Footer/footer";
import Manifesto from "./components/ManifestoPage/manifestoPage";

import { LogoSlider } from "./components/LogoSlider/logoSlider";
import { Muverse } from "./components/muVresePage/muVersePage";
import { WhyNow } from "./components/Whynow/whyNow";
import { VideoSection } from "./components/VideoSection/VideoSection";
import { Navbar } from "./components/Navbar/navbar";
import {VisionAndImpact} from "./components/VisionAndImpact/vissionAndImpact";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="fixed w-full -z-10 h-screen overflow-x-hidden ">
        <video
          autoPlay
          loop
          muted
          className="fixed inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="bg-black/50 backdrop-blur-sm h-full fixed w-full p-10 right-0 top-0"></div>

        {/* Background Gradient */}
        <div className="p-[250px] right-[-50px] top-[-150px] absolute bg-[#6F00CD] bg-opacity-20 rounded-full blur-[100px]"></div>

        <div className="p-[250px] left-[-90px] bottom-[10px] absolute bg-purple-600 bg-opacity-40 rounded-full blur-[100px]"></div>

        <div className="relative z-10 h-[100vh]  flex flex-col items-center justify-center  ">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-tr from-purple-600  to-fuchsia-600 font-[Montesrrat] leading-none md:text-[3rem] text-center font-bold text-[2rem]  lg:text-[6rem] ">
            We Are The <br />
            <span className="flex flex-row ">
              <p>Purple Movement</p>
            </span>
          </h1>
          <p className="text-white lg:text-[1.5rem] text-[1rem] p-3 mt-8 text-center ">
            Rebuilding how India learns-Beyond Borders, Beyond Syllabus, Beyond
            Gatekeepers, Beyond Paywalls
          </p>
          <h1 className="text-white text-[2rem] text-center font-semibold lg:mt-10">
            Pledges:{" "}
            <span className="text-[2.5rem] font-bold text-purple-300">
              100+
            </span>
          </h1>
          <div className="absolute bottom-0   bg-purple-800/30 backdrop-blur-sm  ">
            <LogoSlider />
          </div>
        </div>
        <div className="relative">
          <VideoSection />
        </div>
        <div className="relative">
          <WhyNow />
        </div>
        <div className="relative">
          <div className="p-[20px] w-[20%] h-[20%] rounded-full  top-1/2 left-1/2 transform -translate-x-1/2 absolute bg-purple-700 blur-[100px]"></div>
          <Muverse />
        </div>
        <div className="relative">
          <VisionAndImpact />
        </div>
        <div className="relative">
          <div className="p-[20px] w-full h-[100vh] absolute bg-gradient-to-br from-purple-700/40 to-transparent blur-[100px] "></div>
          <Manifesto />
          <div className="text-white items-center flex text-center flex-col h-[50vh] justify-center bg-purple-950/10 md:rounded-[50px] backdrop-blur-md md:w-[90%] md:m-auto mb-10">
            <h1 className="font-extrabold mb-5 lg:text-[2rem] md:text-[1.5rem] text-[1.2rem] text-center">
              A New Way to Learn, Share, <br />
              and Grow Together
            </h1>
            <p className="w-[95%] md:[60%] text-[.8rem] md:text-[1rem] mb-5">
              Be part of a new learning ecosystem that goes beyond outdated
              classrooms and rigid syllabus. Here, students, creators, and
              mentors come together to share real knowledge, build meaningful
              projects, and shape the future of education — together.
            </p>
            <button className="bg-purple-700 rounded-lg w-fit py-2 px-5">
              JOIN US
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};
export default HomePage;
