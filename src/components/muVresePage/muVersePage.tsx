// import { SVGComponent } from "../SVGComponents/FlowDiagram";

import JoinUsButton from "../JoinUsButton";

export function Muverse({ onJoinUs }: { onJoinUs: () => void }) {
  return (
    <div className="relative w-full flex flex-col  justify-center">
      <div className="z-20 md:mx-20 my-20">
        <h2 className="text-white gap-2 text-[40px] text-center font-[Montesrrat] font-bold mb-10">
          The <span className="text-[#8c3bc3]">μVerse</span>
        </h2>
        <p className="text-white/75 md:text-[18px] text-[12px] mx-auto text-center mb-10 leading-snug md:w-[896px] w-fit px-5 text-pretty">
          The μVerse is your 7-stage adventure from learner to changemaker. You
          set the pace. You choose the path. No grades to chase, no gatekeepers
          to impress just a community that fuels your curiosity and momentum. By
          the end, you’re not just learning, you’re creating, mentoring,
          and driving change.
        </p>

        <div className="w-full max-w-[800px] mx-auto px-4 mt-10">
          {/* <SVGComponent className="w-full h-auto" /> */}
          <img src="/muverse.svg" alt="muverse" />
        </div>
      </div>

      <img
        src="./seperater.png"
        className="w-full blend absolute md:bottom-[60vh] bottom-[30vh] md:h-[50vh] rotate-180"
        alt="seperater"
      />

      <div className="text-white items-center  flex text-center flex-col justify-center   backdrop-blur-md  md:mb-[20vh]">
        <h1 className=" mb-5 mx-auto w-fit md:w-[721.45px] font-[Montesrrat] font-bold  md:text-[50px] text-[20px] text-center">
          A New Way to <span className="text-[#8c3bc3]">Learn, Share,</span>{" "}
          <br />
          and <span className="text-[#8c3bc3]">Grow </span>Together
        </h1>
        <p className="md:w-[973.12px] w-fit px-5 mx-auto text-center text-white/75 text-[12px] md:text-[20px] mb-5">
          Step into a space where ideas, skills, and people come together to
          create real impact. Students, creators, and mentors collaborate here
          to share knowledge, build impactful projects, and reimagine the
          future together.
        </p>
        <JoinUsButton onClick={onJoinUs} className=" items-center mt-5 " />
      </div>
    </div>
  );
}
