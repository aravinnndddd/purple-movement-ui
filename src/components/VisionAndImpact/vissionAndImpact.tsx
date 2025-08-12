export function VisionAndImpact() {
  return (
    <div className=" relative bg-[#101010]  w-full">
      <div className=" relative h-[140vh] ">
        <img
          src="/visionAndImpact.png"
          className="absolute blend object-cover w-full"
          alt="visionAndImpact"
        />
        <div className="w-full pt-50">
          <h2 className="text-[58px] font-[Montesrrat] text-[#a100ff] w-[478px] h-[71px] text-pretty mb-5 mx-auto">
            Vision & Impact
          </h2>
          <p className="text-white text-lg text-center font-[Montesrrat] text-bold text-pretty mb-[10px] ">
            Rebuilding the way India learns together.
          </p>
          <p className="text-white/75 w-[754px] text-center mx-auto  text-pretty">
            Purple envisions a world where knowledge is free, learning is
            purpose-driven, and students are empowered to lead—not just follow.
            We’re creating a public learning infrastructure that belongs to
            everyone, not just institutions
          </p>
        </div>
        <div className=" w-full flex absolute bottom-0">
          <div className="w-full flex flex-row justify-evenly space-x-5">
            <div className="text-white md:text-4xl text-lg">
              <p>10000+</p>
              <p>Learners</p>
            </div>
            <div className="text-white md:text-4xl text-lg">
              <p>30+</p>
              <p>Communities</p>
            </div>
            <div className="text-white md:text-4xl text-lg">
              <p>388+ </p>
              <p>Mentors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
