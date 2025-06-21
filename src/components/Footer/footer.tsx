import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Copyright,
  Phone,
} from "lucide-react";
import logo from "../../assets/logos/logo_pm.png";
export const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-black w-full relative bottom-0  overflow-hidden mt-20 md:mt-5 pt-12 pb-8 rounded-t-[50px] md:rounded-t-[80px]"
    >
      <div className="container mx-auto px-10 md:px-8">
        {/* Logo Row */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Column - About */}
          <div className="md:col-span-3 flex flex-col">
            <div className="flex justify-start mb-5">
              <img
                src={logo}
                alt="Purple movement Logo"
                className="h-16 object-contain"
              />
            </div>
            <p className="text-[rgba(242,242,242,1)] text-base font-normal leading-6 mb-6">
              <span className="font-bold text-[1.5rem]">
                The Purple Movement
              </span>{" "}
              <br />
              Rebuilding how India learns
            </p>

            {/* Social Media Links */}
            <div className="flex items-center  gap-4 mt-auto">
              <div className="p-0 flex items-center justify-center h-[30px] w-[30px] bg-white/10 rounded-full hover:bg-white/20">
                <a href="">
                  <Facebook className="h-4 w-4 text-white" />
                </a>
              </div>
              <div className="p-0 h-[30px] flex items-center justify-center w-[30px] bg-white/10 rounded-full hover:bg-white/20">
                <a href="">
                  <Twitter className="h-4 w-4 text-white" />
                </a>
              </div>
              <div className="p-0 h-[30px] flex items-center justify-center w-[30px] bg-white/10 rounded-full hover:bg-white/20">
                <a href="">
                  <Instagram className="h-4 w-4 text-white" />
                </a>
              </div>
              <div className="p-0 h-[30px] flex items-center justify-center w-[30px] bg-white/10 rounded-full hover:bg-white/20">
                <a href="">
                  <Linkedin className="h-4 w-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Center Column - Quick Links */}
          <div className="md:col-start-8 md:col-end-10 flex flex-col ">
            <h3 className="text-[#F2F2F2] font-medium text-base mb-4">
              Quick Links
            </h3>
            <ul className="text-[rgba(242,242,242,1)] font-normal space-y-3">
              <li className="hover:text-purple-800 transition-colors">
                <a href="" className="inline-block hover:underline">
                  Manifesto
                </a>
              </li>
              <li className="hover:text-purple-800 transition-colors">
                <a
                  href="https://app.mulearn.org"
                  className="inline-block hover:underline"
                >
                  Mulearn
                </a>
              </li>

              <li className="hover:text-purple-800 transition-colors "></li>
            </ul>
          </div>

          {/* Right Column - Contact Info */}
          <div className="md:col-span-3 flex flex-col">
            <h3 className="text-[#F2F2F2] font-medium text-base mb-4">
              Contact Us
            </h3>

            <div className="flex items-center gap-3 text-[rgba(242,242,242,1)] font-light mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <a
                href="mailto:"
                className="hover:text-purple-800 transition-colors"
              >
                xxxxxxxxxxxxxx
              </a>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <address className="hover:text-purple-800  text-[rgba(242,242,242,1)] text-base font-light leading-6 not-italic">
                xxxxxxxxxxxxxxxxxxxxx
                <br />
                xxxxxx, Kerala, India.
              </address>
            </div>

            <div className="flex items-center gap-3 text-[rgba(242,242,242,1)] font-light mt-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <a
                href="tel:+919999999999"
                className="hover:text-purple-800 transition-colors"
              >
                +91 9999999999
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-[rgba(242,242,242,1)] font-normal">
              <Copyright className="w-4 h-4 text-white shrink-0" />
              <p>2025 PURPLE MOVEMENT. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href=""
                className="text-sm text-[rgba(242,242,242,1)] hover:text-purple-800 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href=""
                className="text-sm text-[rgba(242,242,242,1)] hover:text-purple-800 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
