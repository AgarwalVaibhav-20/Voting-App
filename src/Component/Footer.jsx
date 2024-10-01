import {
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-white text-black py-10 border-t border-gray-300  min-h-full animate-fadeIn">
      <div className="container mx-auto flex flex-wrap justify-between px-4">
        {/* Logo and Description */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0 animate-slideUp">
          <h3 className="text-2xl font-bold mb-4">VoteGov</h3>
          <p className="text-sm ">
            VoteGov makes voting easy and secure. Create, manage, and
            participate in polls with confidence. Access real-time results and
            stay informed about upcoming elections. Your voice matters!
          </p>
        </div>

        {/* Office Address */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0 animate-slideUp delay-200">
          <h3 className="text-lg font-bold mb-4">Office</h3>
          <p>Nirvachan Sadan, Ashoka Road, New Delhi 110001</p>
          <p className="text-sm mt-2">
            Email:{" "}
            <a
              href="mailto:support@votingapp.com"
              className="text-[#495057] hover:underline hover:text-gray-600 transition-all duration-300"
            >
              support@votingapp.com
            </a>
          </p>
          <p className="text-sm">
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className="text-[#495057] hover:underline hover:text-gray-600 transition-all duration-300"
            >
              +1 234 567 890
            </a>
          </p>
        </div>

        {/* Links */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0 animate-slideUp delay-300">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/hero-section"
                className="text-black hover:underline hover:text-[#495057] transition-all duration-300"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/"
                className="text-black hover:underline hover:text-[#495057] transition-all duration-300"
              >
                Create a Poll
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard"
                className="text-black hover:underline hover:text-[#495057] transition-all duration-300"
              >
                My Polls
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="text-black hover:underline hover:text-[#495057] transition-all duration-300"
              >
                Results
              </a>
            </li>
            <li>
              <NavLink to="/"
                className="text-black hover:underline hover:text-[#495057] transition-all duration-300"
              >
                Help Center
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="w-full md:w-1/4 animate-slideUp delay-400">
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 max-sm:items-center max-sm:justify-center ">
            <a  target="_blank"
              href="https://www.facebook.com"
              className="text-2xl text-black hover:text-[#212121] transform hover:scale-110 transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a target="_blank"
              href="https://www.whatsapp.com"
              className="text-2xl text-black hover:text-[#212121] transform hover:scale-110 transition-all duration-300"
            >
              <FaWhatsapp />
            </a>
            <a  target="_blank"
              href="https://www.twitter.com"
              className="text-2xl text-black hover:text-[#212121] transform hover:scale-110 transition-all duration-300"
            >
              <FaTwitter />
            </a>
            <a  target="_blank"
              href="https://www.instagram.com"
              className="text-2xl text-black hover:text-[#212121] transform hover:scale-110 transition-all duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className=" flex justify-center text-center items-center border-t border-gray-200 pt-8 mt-8">
        <p className="animate-fadeIn delay-500">
          © {new Date().getFullYear()} VoteGov. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
