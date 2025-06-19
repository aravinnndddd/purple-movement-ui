import { QuoteIcon } from "lucide-react";

import char1 from "../../assets/images/hmmm.png";

const Manifesto = () => {
  return (
    <div
      className={`relative z-10 h-[110vh]   md:grid md:grid-cols-5 md:grid-rows-5 px-2 gap-2 items-center flex"
      }`}
    >
      <div className="md:col-span-2 md:row-span-5 md:col-start-2 ">
        <img
          src={char1}
          className="absolute right-0 bottom-0 w-[200px] md:w-[280px]"
        />
        <div className=" text-[15px] text-white leading-3">
          <h2
            className={`font-varien tracking-[0.1em] mb-5 leading-tight md:text-3xl font-extrabold`}
          >
            Our <span className="text-purple-600">Manifesto</span>
          </h2>
          <div className="font-Poppins font-semibold italic space-y-1 border-l-[10px] px-2 rounded border-purple-600 mb-2">
            <p>We are the Manifestors of Change.</p>
            <p>We are not waiting for the future.</p>
          </div>
          <QuoteIcon size={20} />
          <div className="space-y-2 m-2 leading-1 font-Poppins font-semibold italic">
            <p className="">We are building it</p>
            <p>With courage code, creativity, and clarity.</p>
            <p>We are the voice of a generation </p>{" "}
            <p>That refuses to settle.</p>
            <p>We are not consumers of culture.</p>
            <p>
              We are{" "}
              <span className="text-[#a632ff] font-semibold">
                producers of purpose
              </span>
              .
            </p>
            <p>We break barriers, not just for ourselves</p>
            <p>But for every young mind daring to dream.</p>
            <p>We believe in ecosystems that empower, not limit.</p>
            <p>In access, not gatekeeping.</p>
            <p>In bold visions, not borrowed templates.</p>
            <p>
              We are here to{" "}
              <span className="text-[#a632ff]">reclaim the narrative</span>—
            </p>
            <p>To give confidence to the curious,</p>
            <p>Networks to the bold,</p>
            <p>And direction to the determined.</p>
            <p className=" ">
              This is{" "}
              <span className="text-[#a632ff]">The Purple Movement</span>.
            </p>
            <p className="">A wave of youth power, purpose, and possibility.</p>
            <p className="">A signal that change is not coming—</p>{" "}
            <p>It's already here.</p>
            <p>We are the energy.</p>
            <p>We are the strategy.</p>
            <p>We are the spark.</p>
          </div>

          <QuoteIcon size={20} />

          <p className=" leading-5 font-bold border-l-[10px] px-2  rounded border-purple-600  ">
            This is Purple Movement <br />
            Learning with purpose. Power by people
          </p>
        </div>
      </div>
    </div>
  );
};

export default Manifesto;
