import logo from "../../assets/logos/logo_pm.png";
import { Instagram, MapPin, Copyright } from "lucide-react";
export const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-black w-full relative mt-20 md:mt-5 overflow-hidden pt-12 pb-8 rounded-t-[50px] md:rounded-t-[80px]"
    >
      <div className="container mx-auto px-2 md:px-16">
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
              <a
                href="https://www.instagram.com/tpm.live"
                target="_blank"
                className="p-5 h-[30px] flex items-center justify-center w-fit gap-2 bg-white/10 rounded-full hover:bg-white/20"
              >
                {" "}
                <Instagram className="h-4 w-4 text-purple-500" />
                <p className="text-purple-700">Instagram</p>
              </a>
            </div>
          </div>

            {/* Center Column - Quick Links */}
          <div className="md:col-start-8 md:col-end-10 justify-center flex flex-col ">
            <h3 className="text-[#F2F2F2] font-bold text-base mb-4">
              Quick Links
            </h3>
            <ul className="text-[rgba(242,242,242,1)] font-normal space-y-3">
              {/* <li className="hover:text-purple-800 transition-colors">
                <a href="" className="inline-block hover:underline">
                  Manifesto
                </a>
              </li> */}
              <li className="hover:text-purple-800 transition-colors">
                <a
                  href="https://app.mulearn.org"
                  className="inline-block underline "
                >
                  Mulearn
                </a>
              </li>

              <li className="hover:text-purple-800 transition-colors "></li>
            </ul>
          </div>

          {/* Right Column - Contact Info */}
          <div className="md:col-span-3 flex flex-col  justify-center">
            <h3 className="text-[#F2F2F2] font-medium text-base mb-4">
              Contact Us
            </h3>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <address className="hover:text-purple-800  text-[rgba(242,242,242,1)] text-base font-light leading-6 not-italic">
                Technopark
                <br />
                Thiruvananthapuram, Kerala, India.
              </address>
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


          </div>
        </div>
      </div>
    </footer>
  );
};
