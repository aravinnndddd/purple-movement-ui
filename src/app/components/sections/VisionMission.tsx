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
          We aim to build a world free of barriers and privilege, where
          compassion and fairness open the door for everyone to rise and realize
          their potential. By helping people grow and encouraging them to uplift
          others, we create a community that thrives together
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
          A community that rises beyond borders, syllabus limits, and
          gatekeepers, where curiosity and generosity guide how we learn and
          grow. Together, we create an open cycle of shared learning, mutual
          support, and lifelong empowerment because real progress begins with
          generosity.
        </p>
      </div>
    </section>
  );
};
