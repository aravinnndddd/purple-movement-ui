// import { SVGComponent } from "../SVGComponents/FlowDiagram";

import JoinUsButton from "../JoinUsButton";

export function Muverse({ onJoinUs }: { onJoinUs: () => void }) {
  return (
    <div className="relative w-full flex flex-col justify-center">
      <div className="z-20 md:mx-20 my-20">
        <h2 className="text-white gap-2 text-[40px] text-center font-[Montesrrat] font-bold mb-10">
          The <span className="text-[#8c3bc3]">μVerse</span>
        </h2>
        <p className="text-white/75 md:text-[18px] text-[12px] mx-auto text-center mb-10 leading-snug md:w-[896px] w-fit px-5 text-pretty">
          The μVerse is a 7-stage learning journey where students explore,
          build, and grow at their own pace. No grades. No gatekeepers. Just
          momentum, curiosity, and community. It’s designed to move learners
          from passive consumers to Purposeful People—creators, mentors, and
          change agents—ready to take on the world.
        </p>

        <div className="w-full max-w-[800px] mx-auto px-4 mt-10">
          {/* <SVGComponent className="w-full h-auto" /> */}
          <img src="/muverse.svg" alt="muverse" />
        </div>
      </div>
      <div className="text-white items-center  flex text-center flex-col justify-center   backdrop-blur-md  mb-[20vh]">
        <h1 className=" mb-5 mx-auto w-[358px] md:w-[721.45px] font-[Montesrrat] font-bold  md:text-[50px] text-[1.2rem] text-center">
          A New Way to <span className="text-[#8c3bc3]">Learn, Share,</span>{" "}
          <br />
          and <span className="text-[#8c3bc3]">Grow </span>Together
        </h1>
        <p className="md:w-[973.12px] w-[358px] mx-auto text-center text-white/75 text-[.8rem] md:text-[20px] mb-5">
          Be part of a new learning ecosystem that goes beyond outdated
          classrooms and rigid syllabus. Here, students, creators, and mentors
          come together to share real knowledge, build meaningful projects, and
          shape the future of education — together.
        </p>
        <JoinUsButton onClick={onJoinUs} className=" items-center mt-5 " />
      </div>
    </div>
  );
}
