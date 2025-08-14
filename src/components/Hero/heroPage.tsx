import JoinUsButton from "../JoinUsButton";

type HeroProps = {
  onJoinUs: () => void;
};

export const Hero = ({ onJoinUs }: HeroProps) => {
  return (
    <main className="flex flex-col items-center ">
      <div className="hero-title leading-none text-[35px] md:w-[866px] w-[358px] uppercase text-center font-bold text-white">
        <p className="mb-[10px] text-[14px] md:text-[35px]">We Are The</p>
        <p className="flex flex-row justify-center uppercase bg-clip-text text-transparent text-[35px] md:text-[80px] bg-gradient-to-tr from-[#8E00FF] to-[#D8B0FA] font-[Montesrrat] font-extrabold">
          Purple Movement
        </p>
      </div>
      <p className="hero-subtitle text-white/75 text-[10px] md:text-[20px] mt-[15px] text-center w-[278.55px] md:w-[676.01px] mx-auto">
        Beyond Borders, Beyond Syllabus, Beyond gatekeepers, Beyond paywalls.
      </p>

      <JoinUsButton
        onClick={onJoinUs}
        className="items-center text-[#FFF9F9] uppercase"
      />
    </main>
  );
};
