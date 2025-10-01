export const VisionMission = () => {
  return (
    <section
      id="about"
      aria-label="Vision and Mission Section"
      className="flex flex-col md:flex-row items-center justify-center gap-12 px-4 sm:px-6 md:px-12 lg:px-20 md:py-16"
    >
      {/* Left - Vision */}
      <div className="flex flex-col items-start w-full max-w-xl text-left">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold font-montserrat capitalize">
          Our Goal
        </h2>
        <p className="mt-4 text-white/75 text-sm sm:text-base md:text-lg leading-relaxed font-poppins text-justify md:text-left">
          A world where opportunity isn&apos;t limited by barriers or privilege, allowing the curious to gain confidence, the bold to build networks, and the determined to find direction, empowering everyone to connect, grow, and create impact.
        </p>
      </div>

      {/* Center Divider */}
      <div className="hidden md:block w-px h-72 bg-gradient-to-t from-[#6F00CD] to-[#F7D8FA]" />
      <div className="block md:hidden w-24 sm:w-36 h-px bg-fuchsia-200" />

      {/* Right - Mission */}
      <div className="flex flex-col items-start md:items-end w-full max-w-xl text-left md:text-right">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold font-montserrat capitalize">
          Our Purpose
        </h2>
        <p className="mt-4 text-white/75 text-sm sm:text-base md:text-lg leading-relaxed font-poppins text-justify md:text-right">
          To build a people-powered network that breaks barriers and empowers students, professionals and changemakers to go beyond syllabus, borders and gatekeepers, turning curiosity into impact.
        </p>
      </div>
    </section>
  );
};