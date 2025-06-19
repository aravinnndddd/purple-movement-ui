import { FacebookIcon, Instagram, Linkedin } from "lucide-react";
import logo from "../../assets/images/logo.png";
export const Footer = () => {
  return (
    <div className="bg-black bottom-0 md:text-[1.5rem] text-[.5rem] relative h-[40vh] p-10 grid grid-flow-col w-full gap-2">
      <div className=" grid">
        <img src={logo} className="md:w-[150px] w-[120px]" />
        <p className="text-white">
          {" "}
          <span className=" font-extrabold text-[1rem]">
            The Purple Movement
          </span>{" "}
          <br /> Rebuilding how india learns <br /> © 2025 The Purple
          <br />
          Movement All rights reserved
        </p>
      </div>
      <div className="flex mb-10 items-end ">
        {" "}
        <p className=" text-white">
          <span className="font-bold">Quick Links </span>
          <br />
          About <br />
          μVerse <br />
          Vision
          <br />
        </p>
      </div>
      <div className="flex mb-10 items-end">
        <p className="text-white">
          <span className="font-bold"> Essentials</span>
          <br />
          Blogs <br />
          Privacy Policy <br />
          Terms & Conditions
          <br />
        </p>
      </div>
      <div className="flex mb-10 gap-3 justify-end flex-col">
        <Instagram color="white" size={15} />
        <FacebookIcon color="white" size={15} />
        <Linkedin color="white" size={15} />
      </div>
    </div>
  );
};
