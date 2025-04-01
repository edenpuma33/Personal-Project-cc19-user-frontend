import { assets } from "@/assets/assets";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-evenly my-10 mt-40">
        <img className="mb-5 h-12" src={assets.nike_icon} alt="" />
        <img className="mb-5 h-12" src={assets.bingx_icon} alt="" />
        <img className="mb-5 h-12" src={assets.livenation_icon} alt="" />
      </div>
      <div className="flex flex-col sm:grid grid-cols-4 gap-14 my-10 mt-40 text-sm">
        {/* Logo & Description */}
        <div>
          <img src={assets.logo_chelsea} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-[#034694] text-xl font-medium">
            Chelsea Football Club
          </p>
          <p className="w-full md:w-2/3 text-gray-600">Stamford Bridge</p>
          <p className="w-full md:w-2/3 text-gray-600">Fulham Road</p>
          <p className="w-full md:w-2/3 text-gray-600">London</p>
          <p className="w-full md:w-2/3 text-gray-600">SW6 1HS</p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5 text-[#034694]">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>About The Club</li>
            <li>Contact Us</li>
            <li>Frequently Asked Questions</li>
            <li>The Shed - Chat, Rumours & More</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5 text-[#034694]">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@foreveryyou.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <p className="text-xl font-medium mb-5 text-[#034694]">FOLLOW US</p>
          <ul className="flex gap-4 text-gray-600">
            <li className="hover:text-gray-800 transition flex items-center gap-2">
              <FaFacebookSquare />
            </li>
            <li className="hover:text-gray-800 transition flex items-center gap-2">
              <FaSquareXTwitter />
            </li>
            <li className="hover:text-gray-800 transition flex items-center gap-2">
              <FaInstagramSquare />
            </li>
            <li className="hover:text-gray-800 transition flex items-center gap-2">
              <FaYoutubeSquare />
            </li>
          </ul>
        </div>

        <div className="col-span-4">
          <hr />
          <p className="py-5 text-sm text-center">
            © 2025 Chelsea FC. All rights reserved. No part of this site may be
            reproduced without our written permission.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
