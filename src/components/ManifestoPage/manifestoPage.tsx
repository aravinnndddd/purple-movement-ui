import clsx from "clsx";
import char1 from "../../assets/images/hmmm.png";
import Cube3D from "./cube";

const Manifesto = () => {
  return (
    <div className="flex flex-col min-h-screen w-full text-white px-4 relative sm:py-16 ]">
      <div className="md:pl-24">
        <div className="hidden md:hidden lg:visible lg:absolute  lg:right-[150px] lg:flex ">
          <Cube3D />
        </div>
        <div className="hidden md:hidden lg:visible lg:absolute lg:right-50 lg:flex lg:justify-end"></div>

        <Title />
        <Box className="md:my-16 my-8">
          We are not waiting for the future. We are building it. <br /> With
          courage, code, creativity, and community.
        </Box>
        <ManifestoContent />

        <Box className="md:mt-10 mt-5">
          This is The Purple Movement. <br /> Learning with purpose. Powered by
          people.
        </Box>
      </div>

      <div className="w-full flex justify-end sm:absolute max-w-[1360px] right-0  bottom-0">
        <img src={char1} className="w-[250px] md:w-[30%] h-full " />
      </div>
    </div>
  );
};
const Title = () => {
  return (
    <span className=" flex gap-2 sm:gap-3 font-Montserrat font-bold max-w-fit text-2xl xs:text-3xl sm:text-5xl">
      <span className="">Our</span>
      <span className="text-purple-600 ">Manifesto</span>
    </span>
  );
};
type DivType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Box = ({ children, className, ...props }: DivType) => {
  return (
    <div className={clsx("flex flex-row gap-3", className)} {...props}>
      <div className=" w-1 sm:w-[6px] bg-purple-600  rounded-sm sm:rounded-3xl" />
      <span className="text-xs font-semibold my-2 sm:text-sm sm:my-3 italic leading-6">
        {children}
      </span>
    </div>
  );
};

const ManifestoContent = () => {
  return (
    <>
      <div className="h-5 w-5 ">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 23 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99766 0.112888L6.69766 12.1129L5.59766 7.61289C7.03099 7.61289 8.19766 8.02956 9.09766 8.86289C9.99766 9.69622 10.4477 10.8462 10.4477 12.3129C10.4477 13.7462 9.98099 14.9129 9.04766 15.8129C8.14766 16.6796 7.01432 17.1129 5.64766 17.1129C4.24766 17.1129 3.08099 16.6796 2.14766 15.8129C1.24766 14.9129 0.797656 13.7462 0.797656 12.3129C0.797656 11.8796 0.83099 11.4629 0.897656 11.0629C0.964323 10.6296 1.09766 10.1296 1.29766 9.56289C1.49766 8.99622 1.78099 8.24622 2.14766 7.31289L5.04766 0.112888H9.99766ZM21.7977 0.112888L18.4977 12.1129L17.3977 7.61289C18.831 7.61289 19.9977 8.02956 20.8977 8.86289C21.7977 9.69622 22.2477 10.8462 22.2477 12.3129C22.2477 13.7462 21.781 14.9129 20.8477 15.8129C19.9477 16.6796 18.8143 17.1129 17.4477 17.1129C16.0477 17.1129 14.881 16.6796 13.9477 15.8129C13.0477 14.9129 12.5977 13.7462 12.5977 12.3129C12.5977 11.8796 12.631 11.4629 12.6977 11.0629C12.7643 10.6296 12.8977 10.1296 13.0977 9.56289C13.2977 8.99622 13.581 8.24622 13.9477 7.31289L16.8477 0.112888H21.7977Z"
            fill="white"
          />
        </svg>
      </div>
      <p className="my-10 italic md:max-w-[60%] leading-6 text-xs sm:text-base md:leading-8  ml-6">
        We are the Manifestors of Change.
        <br />
        We are not waiting for the future.
        <br />
        We are building it—with courage, code, creativity, and clarity.
        <br />
        We are the voice of a generation that refuses to settle.
        <br />
        <br />
        We are not consumers of culture.
        <br />
        We are producers of purpose.
        <br />
        We break barriers, not just for ourselves, but for every young mind
        daring to dream.
        <br />
        We believe in ecosystems that empower, not limit.
        <br />
        <br />
        In access, not gatekeeping.
        <br />
        In bold visions, not borrowed templates.
        <br />
        We are here to reclaim the narrative— To give confidence to the curious,
        <br />
        Networks to the bold, And direction to the determined.
        <br />
        This is The Purple Movement.
        <br />
        A wave of youth power, purpose, and possibility.
        <br />
        <br />
        A signal that change is not coming—it's already here.
        <br />
        We are the energy.
        <br />
        We are the strategy.
        <br />
        We are the spark.
        <br />
        <br />
        And it starts now.
      </p>
      <div className="h-5 w-5">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 23 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.1 17.3129L16.4 5.31289L17.5 9.81289C16.0667 9.81289 14.9 9.39622 14 8.56289C13.1 7.72956 12.65 6.57956 12.65 5.11289C12.65 3.67956 13.1167 2.51289 14.05 1.61289C14.95 0.746225 16.0833 0.312891 17.45 0.312891C18.85 0.312891 20.0167 0.746225 20.95 1.61289C21.85 2.51289 22.3 3.67956 22.3 5.11289C22.3 5.54623 22.2667 5.96289 22.2 6.36289C22.1333 6.79622 22 7.29622 21.8 7.86289C21.6 8.42956 21.3167 9.17956 20.95 10.1129L18.05 17.3129H13.1ZM1.3 17.3129L4.6 5.31289L5.7 9.81289C4.26667 9.81289 3.1 9.39622 2.2 8.56289C1.3 7.72956 0.849999 6.57956 0.849999 5.11289C0.849999 3.67956 1.31667 2.51289 2.25 1.61289C3.15 0.746225 4.28333 0.312891 5.65 0.312891C7.05 0.312891 8.21667 0.746225 9.15 1.61289C10.05 2.51289 10.5 3.67956 10.5 5.11289C10.5 5.54623 10.4667 5.96289 10.4 6.36289C10.3333 6.79622 10.2 7.29622 10 7.86289C9.8 8.42956 9.51667 9.17956 9.15 10.1129L6.25 17.3129H1.3Z"
            fill="white"
          />
        </svg>
      </div>
    </>
  );
};

export default Manifesto;
