// import { SVGComponent } from "../SVGComponents/FlowDiagram";

export function Muverse() {
  return (
    <div className="relative w-full flex justify-center">
      <div className="w-[90%]">
        <div className="z-20 md:mx-20 my-20">
          <h2 className="text-white gap-2 text-[40px] text-center font-[Montesrrat] font-bold mb-10">
            The <span className="text-[#8c3bc3]">μVerse</span>
          </h2>
          <p className="text-white/75 md:text-[18px] mx-auto text-center mb-10 leading-snug w-[896px] text-pretty">
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
      </div>
    </div>
  );
}
