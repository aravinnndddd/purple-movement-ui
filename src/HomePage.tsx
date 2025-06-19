import bgVideo from "./assets/bg.mp4";
import { Footer } from "./components/Footer/footer";
import { Navbar } from "./components/Navbar/navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="fixed w-full -z-10 h-screen overflow-x-hidden">
        <video
          autoPlay
          loop
          muted
          className="fixed inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* Background Gradient */}
        <div className="p-[250px] right-[-50px] top-[-150px] absolute bg-[#6F00CD] bg-opacity-20 rounded-full blur-[100px]"></div>

        <div className="p-[250px] left-[-90px] top-[150px] absolute bg-purple-600 bg-opacity-30 rounded-full blur-[100px]"></div>

        <div className="relative z-10 h-[100vh]  flex flex-col items-center justify-center  ">
          <h1 className="text-[#8c3bc3] font-[Montesrrat] leading-none text-[2.5rem] md:text-[6rem] text-center font-bold">
            We Are The <br />
            Purple Movement
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
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default HomePage;
