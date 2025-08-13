import { useEffect, useRef, useState } from "react";

function useCountUp(
  target: number,
  duration: number,
  startWhenVisible: boolean
) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!startWhenVisible || startedRef.current) return;
    startedRef.current = true;

    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(percentage * target));
      if (percentage < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, startWhenVisible]);

  return count;
}

export function VisionAndImpact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const learners = useCountUp(50000, 1500, visible); // 1.5s duration
  const communities = useCountUp(30, 1500, visible);
  const mentors = useCountUp(388, 1500, visible);

  return (
    <div className="relative w-full " ref={sectionRef}>
      <div className="relative h-[105vh]">
        <img
          src="/visionAndImpact.png"
          className="absolute blend object-cover h-[95vh] w-full"
          alt="visionAndImpact"
        />
        <div className="h-[30vh] w-full blur-[10px] absolute bg-gradient-to-b from-[#04020F]/50 to-black bottom-[2vh]"></div>
        <div className="w-full pt-10">
          <h2 className="md:text-[58px] text-[20px] font-[Montesrrat] text-[#a100ff] text-center w-[206px] md:w-[478px] md:h-[71px] text-pretty md:mb-5 mx-auto">
            Vision & Impact
          </h2>
          <p className="text-white  text-[12px] md:h-[20px] h-[14px] md:text-lg text-center w-fit md:w-[395px]  mx-auto font-[Montesrrat] font-bold text-pretty mb-[10px]">
            Rebuilding the way India learns together.
          </p>
          <p className="text-white/75 md:w-[754px] w-[316.63px] text-[10px] md:text-[18px] text-center mx-auto text-pretty">
            Purple envisions a world where knowledge is free, learning is
            purpose-driven, and students are empowered to lead—not just follow.
            We’re creating a public learning infrastructure that belongs to
            everyone, not just institutions
          </p>
        </div>
        <div className="w-full flex absolute bottom-[20vh] bg-transparent">
          <div className="w-full flex md:flex-row flex-col justify-center gap-20 md:justify-evenly md:space-x-5">
            <div className="text-white md:text-4xl text-lg text-center">
              <p className="font-extrabold">{learners}+</p>
              <p>Learners</p>
            </div>
            <div className="text-white md:text-4xl text-lg text-center">
              <p className="font-extrabold">{communities}+</p>
              <p>Communities</p>
            </div>
            <div className="text-white md:text-4xl text-lg text-center">
              <p className="font-extrabold">{mentors}+</p>
              <p>Mentors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
