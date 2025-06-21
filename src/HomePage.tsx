import bgVideo from "./assets/bg.mp4";
import { Footer } from "./components/Footer/footer";
import Manifesto from "./components/ManifestoPage/manifestoPage";
import { Navbar } from "./components/Navbar/navbar";
import { LogoSlider } from "./components/LogoSlider/logoSlider";
import { Muverse } from "./components/muVresePage/muVersePage";

import { WhyNow } from "./components/Whynow/whyNow";


import logo1 from "./assets/logos/logopm.png";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section with Fixed Background */}
      <div className="relative h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="fixed inset-0 w-full h-full object-cover -z-10"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* Background Gradient */}
        <div className="p-[250px] right-[-50px] top-[-150px] absolute bg-[#6F00CD] bg-opacity-20 rounded-full blur-[100px]"></div>

        <div className="p-[250px] left-[-90px] top-[150px] absolute bg-purple-600 bg-opacity-30 rounded-full blur-[100px]"></div>

        <div className="relative z-10 h-[100vh] flex flex-col items-center justify-center">
          <h1 className="text-[#8c3bc3] font-[Montesrrat] leading-none text-[2.5rem] md:text-[6rem] text-center font-bold">


        <div className="p-[250px] left-[-90px] bottom-[10px] absolute bg-purple-600 bg-opacity-40 rounded-full blur-[100px]"></div>

        <div className="relative z-10 h-[100vh]  flex flex-col items-center justify-center  ">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-tr from-purple-600  to-fuchsia-600 font-[Montesrrat] leading-none text-[2.5rem] md:text-[6rem] text-center font-bold">

            We Are The <br />
            <span className="flex flex-row">
              <p>Purple Movement</p>
            </span>
          </h1>
          <p className="text-white md:text-[1.5rem] text-[1rem] p-3 mt-8 text-center ">
            Rebuilding how India learns-Beyond Borders, Beyond Syllabus, Beyond
            Gatekeepers, Beyond Paywalls
          </p>
          <h1 className="text-white text-[2rem] text-center font-semibold md:mt-10">
            Pledges:{" "}
            <span className="text-[2.5rem] font-bold text-purple-300">
              100+
            </span>
          </h1>
          <div className="absolute bottom-0 bg-purple-800/30 backdrop-blur-sm">
            <LogoSlider />
          </div>
        </div>

      </div>

      {/* Content Sections */}
      <div className="relative z-20">
        <WhyNow/>
        </div>

        <div className="relative">
          <div className="p-[20px] w-[20%] h-[20%] rounded-full  top-1/2 left-1/2 transform -translate-x-1/2 absolute bg-purple-700 blur-[100px]"></div>
          <Muverse />
        </div>

        <div className="relative">
          <div className="p-[20px] w-full h-[100vh] absolute bg-gradient-to-br from-purple-700/40 to-transparent blur-[100px] "></div>
          <Manifesto />
        </div>


        <Footer />
      </div>
    </div>
  );
};
export default HomePage;
