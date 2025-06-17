import { FacebookIcon, Instagram, Linkedin } from "lucide-react";
import logo from "../../assets/images/logo.png";
export const Footer = () => {
  return (
    <div className="bg-black h-[50vh] p-10 grid grid-flow-col w-full">
      <div className=" grid">
        <img src={logo} width={200} />
        <p className="text-white">
          {" "}
          <span className="text-[1.5rem] font-extrabold">
            The Purple Movement
          </span>{" "}
          <br /> Rebuilding how india learns <br /> © 2025 The Purple
          <br />
          Movement All rights reserved
        </p>
      </div>
      <div className="">
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
      <div className="">
        <p className="text-white">
          Essentials
          <br />
          Blogs <br />
          Privacy Policy <br />
          Terms & Conditions
          <br />
        </p>
      </div>
      <div className="">
        <Instagram color="white" />
        <FacebookIcon color="white" />
        <Linkedin color="white" />
      </div>
    </div>
  );
};
