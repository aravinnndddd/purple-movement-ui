import videoPlaceholder from "../../assets/images/video-placeholder.png";

export function VideoSection() {
  return (
    <div className="px-2 md:px-20 my-20 flex flex-col md:flex-row md:justify-center gap-10 md:gap-40 items-center">
      <div
        className="border-[3px] border-purple-700 rounded-md  w-[20rem] md:w-[30rem] h-[20rem] bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: `url(${videoPlaceholder})`,
        }}
      >
        {/* <CgPlayButtonO  className="text-white text-6xl"/> */}
      </div>
      <div className="w-[20rem] md:w-[30rem]">
        <h2 className="text-white text-3xl font-[Montesrrat] text-left font-bold mb-10 leading-snug text-pretty">
          Where <span className="text-purple-600">Purposeful People</span> Begin
          a Mission
        </h2>
        <p className="text-left text-white">
          Purple is a movement that bridges the energy of youth with the wisdom
          of experts to reimagine how knowledge flows. It breaks away from
          outdated systems, enabling students to learn beyond textbooks,
          borders, and gatekeepers. By uniting purpose-driven people, Purple
          creates a space for open, fast, and practical learning that’s built
          for today’s world.
        </p>
      </div>
    </div>
  );
}
