import { SVGComponent } from "../SVGComponents/FlowDiagram";

export function Muverse() {
  return (
    <div className="relative w-full flex justify-center">
     <div className="w-[90%]">
       <div className="z-20  my-20">
      <h2 className="text-white flex text-3xl font-[Montesrrat] text-left font-bold mb-10">
        The <span className="text-[#8c3bc3]">μ</span>Verse
      </h2>
      <p className="text-white text-left text-pretty">
        The μVerse is a 7-stage learning journey where students explore, build,
        and grow at their own pace. No grades. No gatekeepers. Just momentum,
        curiosity, and community. It’s designed to move learners from passive
        consumers to Purposeful People—creators, mentors, and change
        agents—ready to take on the world.
      </p>

      <div className="w-full max-w-[800px] mx-auto px-4 mt-10">
        <SVGComponent className="w-full h-auto" />
      </div>
    </div>
     </div>
    </div>
  );
}
