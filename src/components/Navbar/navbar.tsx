import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo_pm.png";
import { Menu, X } from "lucide-react"; // icons

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-50 shadow-md scroll-smooth transition-all duration-300 
      ${isScrolled ? "backdrop-blur-md bg-black/40" : "bg-transparent"}`}
    >
      <div className="mx-auto flex items-center justify-between px-4 py-8 h-[10vh]">
        {/* Logo */}
        <div className="md:px-10">
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
        <div className="md:hidden bg-black/10 backdrop-blur-md shadow-md">
          <ul className="flex flex-col divide-y divide-gray-200">
            <li>
              <a
                href="#home"
                className="block px-6 py-3 text-white hover:bg-purple-500 hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block px-6 py-3 text-white hover:bg-purple-500 hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <Link
                to="/events"
                className="block px-6 py-3 text-white hover:bg-purple-500 hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
            </li>
            <li>
              <a
                href="#verse"
                className="block px-6 py-3 text-white hover:bg-purple-500 hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                μVerse
              </a>
            </li>
            <li>
              <a
                href="#vision"
                className="block px-6 py-3 text-white hover:bg-purple-500 hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                Vision
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
