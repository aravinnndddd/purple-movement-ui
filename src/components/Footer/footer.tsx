import logo from "../../assets/logos/logo_pm.png";
import { Instagram, Copyright, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-[#201629] w-full mt-20 md:mt-5 pt-12 pb-8"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:items-start">
          {/* Left Column - Logo & About */}
          <div className="flex flex-col">
            <div className="mb-5">
              <img
                src={logo}
                alt="Purple Movement Logo"
                className="h-16 object-contain w-auto"
              />
            </div>

            {/* Text Block */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">The Purple Movement</h2>
              <p className="text-base text-white/80 mt-1">Rebuilding how India learns</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/tpm.live"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/the-purple-movement/posts/?feedView=all"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:items-center">
            <h3 className="text-white font-bold text-base mb-4">
              Quick Links
            </h3>
            <ul className="text-white/80 font-normal space-y-3">
              <li>
                <a href="#about" className="hover:text-purple-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#muverse" className="hover:text-purple-400 transition-colors">
                  μVerse
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-purple-400 transition-colors">
                  Vision
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-sm text-white/80">
            <Copyright className="w-4 h-4" />
            <p>2025 The Purple Movement. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};