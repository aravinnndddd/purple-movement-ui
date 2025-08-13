import logo from "../../assets/logos/logo_pm.png";
import { Instagram, MapPin, Copyright } from "lucide-react";
import { Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-[#201629] w-full relative mt-20 md:mt-5 overflow-hidden pt-12 pb-8 "
    >
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Column - Logo & About */}
          <div className="md:col-span-3 flex flex-col">
            <div className="flex justify-start mb-5">
              <img src={logo} alt="Purple Movement Logo" className="h-16 object-contain" />
            </div>
            <p className="text-[rgba(242,242,242,1)] text-base font-normal leading-6 mb-6">
              <span className="font-bold text-[1.5rem]">The Purple Movement</span>
              <br />
              Rebuilding how India learns
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-auto">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaXTwitter className="h-5 w-5 text-white hover:text-purple-400" />
              </a>
              <a href="https://www.instagram.com/tpm.live" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-white hover:text-purple-400" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-white hover:text-purple-400" />
              </a>
            </div>
          </div>

          {/* Quick Links & Contact Us */}
          <div className="md:col-span-9 flex flex-col md:flex-row justify-between pt-6">
            {/* Quick Links */}
            <div className="flex flex-col ">
              <h3 className="text-[#F2F2F2] font-bold text-base mb-4">Quick Links</h3>
              <ul className="text-[rgba(242,242,242,1)] font-normal space-y-3">
                <li className="hover:text-purple-400 transition-colors">
                  <a href="#" className="inline-block">About</a>
                </li>
                <li className="hover:text-purple-400 transition-colors">
                  <a href="#" className="inline-block">μVerse</a>
                </li>
                <li className="hover:text-purple-400 transition-colors">
                  <a href="#" className="inline-block">Vision</a>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col mt-8 md:mt-0">
              <h3 className="text-[#F2F2F2] font-medium text-base mb-4">Contact Us</h3>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <address className="text-[rgba(242,242,242,1)] text-base font-light leading-6 not-italic">
                  Technopark
                  <br />
                  Thiruvananthapuram, Kerala, India.
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-[rgba(242,242,242,1)] font-normal">
              <Copyright className="w-4 h-4 text-white shrink-0" />
              <p>2025 The Purple Movement. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
