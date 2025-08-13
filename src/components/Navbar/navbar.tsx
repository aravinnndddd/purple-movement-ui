import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo_pm.png";
import { Menu, X } from "lucide-react"; // icons

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur-md shadow-md scroll-smooth">
      <div className="mx-auto flex items-center justify-between px-4 py-8 h-[10vh]">
        {/* Logo */}
        <div className="px-10">
          <img src={logo} width={100} alt="Logo" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-20 px-20 text-white">
          <a
            href="/"
            className="text-white font-bold hover:text-[#6F00CD] transition-all ease duration-300"
          >
            Home
          </a>
          <a
            href="/#about"
            className="font-bold hover:text-[#6F00CD] transition-all ease duration-300"
          >
            About
          </a>
          <Link
            to="/events"
            className="font-bold hover:text-[#6F00CD] transition-all ease duration-300"
          >
            Events
          </Link>
          <a
            href="/#verse"
            className="font-bold hover:text-[#6F00CD] transition-all ease duration-300"
          >
            μVerse
          </a>
          <a
            href="/#vision"
            className="font-bold hover:text-[#6F00CD] transition-all ease duration-300"
          >
            Vision
          </a>
        </div>

        {/* Hamburger (mobile only) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X size={28} color="white" />
            ) : (
              <Menu size={28} color="white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 pb-4">
          <a
            href="#home"
            className="border-4 rounded-[20px] px-4 border-purple-500 text-purple-600 font-bold"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-purple-600 font-bold border-4 rounded-[20px] px-4 border-purple-500"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <Link
            to="/events"
            className="text-purple-600 font-bold border-4 rounded-[20px] px-4 border-purple-500"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <a
            href="#verse"
            className="text-purple-600 font-bold border-4 rounded-[20px] px-4 border-purple-500"
            onClick={() => setIsOpen(false)}
          >
            μVerse
          </a>
          <a
            href="#vision"
            className="text-purple-600 font-bold border-4 rounded-[20px] px-4 border-purple-500"
            onClick={() => setIsOpen(false)}
          >
            Vision
          </a>
        </div>
      )}
    </nav>
  );
};
