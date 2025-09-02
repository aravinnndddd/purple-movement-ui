import logo from "../../assets/logos/logo_pm.png";
import { Copyright } from "lucide-react";


const ACCESS_KEY = import.meta.env.VITE_FORM_ACCESS_KEY;

export const Footer = () => {
  return (
    <footer id="contact" className="bg-[#201629] w-full py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row justify-between">
          {/* Logo and Title */}
          <div className="flex flex-col items-start gap-3">
            <img
              src={logo}
              alt="Purple Movement Logo"
              className="h-10 w-auto object-contain"
            />
           <div className="flex flex-col gap-5 md:flex-row md:justify-between md:gap-40">
             <h2 className="text-xl font-bold text-white">
              The Purple Movement
            </h2>
            {/* Navigation Links */}
          <nav className="flex flex-col items-start md:items-center">
            <ul className="flex flex-wrap gap-8 text-white/90 font-medium">
              <li>
                <a
                  href="#about"
                  className="hover:text-purple-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#muverse"
                  className="hover:text-purple-400 transition-colors"
                >
                  μVerse
                </a>
              </li>
              <li>
                <a
                  href="#vision"
                  className="hover:text-purple-400 transition-colors"
                >
                  Vision
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-purple-400 transition-colors"
                >
                  FAQʼs
                </a>
              </li>
            </ul>
          </nav>
           </div>

          </div>

      
          {/* Feedback Form */}
          <div>
            <h3 className="text-[#F2F2F2] font-medium text-base mb-4">
              Send Us Feedback
            </h3>
            <form
              action="https://api.web3forms.com/submit" 
              method="POST"
              className="w-full md:w-96 flex flex-col gap-3 text-sm"
            >
              <input type="hidden" name="access_key" value={ACCESS_KEY}></input>
              <textarea
                name="feedback"
                placeholder="Your Feedback"
                rows={4}
                required
                className="w-full px-4 py-2 rounded-md bg-white/10 placeholder-white/60 text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              />
              <button
                type="submit"
                className="self-start bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 pt-6 border-t border-white/10 flex justify-center items-center gap-1 text-xs text-white/60">
          <Copyright className="w-3 h-3" />
          <span>2025 The Purple Movement. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};