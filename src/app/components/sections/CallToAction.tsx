import Image from "next/image";

export const CallToAction = () => {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-center items-center gap-8 md:gap-14 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 bg-black mt-12 sm:mt-20 md:mt-32">
      {/* Text Section */}
      <div className="max-w-full md:max-w-[700px] text-center md:text-left flex flex-col justify-start items-start gap-4">
        <div className="w-full bg-gradient-to-t from-[#D6A4FF] to-[#6F00CD] bg-clip-text text-transparent text-xl sm:text-2xl md:text-4xl font-bold font-montserrat">
          Your Journey Begins
        </div>

        <div className="w-full text-white text-sm sm:text-base md:text-lg font-montserrat font-normal leading-relaxed">
          You’ve sparked the start of a borderless, collaborative journey. Ideas will grow, connections will flourish, and together, we’ll turn ambition into real impact. Get ready the movement ignites with you.
          <br /><br />
          <span className="bg-gradient-to-l from-[#D6A4FF] to-[#6F00CD] bg-clip-text text-transparent text-base sm:text-lg md:text-2xl font-bold font-montserrat">
            Together, we are the Purple Movement.
          </span>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 relative shrink-0">
        <Image 
          fill
          src="/images/spiral.png"
          alt="Purple Movement spiral illustration"
          className="object-contain"
        />
      </div>
    </div>
  );
};