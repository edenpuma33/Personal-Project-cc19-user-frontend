import { assets } from "@/assets/assets";

const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      {/* Logo & Description */}
      <div>
        <img src={assets.logo} className="mb-5 w-32" alt="" />
        <p className="w-full md:w-2/3 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error,
          officia illum aliquid quaerat possimus labore. Consectetur quod
          nesciunt suscipit porro.
        </p>
      </div>

      {/* Company Links */}
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>HOME</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+1-212-456-7890</li>
          <li>contact@foreveryyou.com</li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <p className="text-xl font-medium mb-5">FOLLOW US</p>
        <ul className="flex gap-4 text-gray-600">
          <li className="hover:text-gray-800 transition">🔵 Facebook</li>
          <li className="hover:text-gray-800 transition">🐦 Twitter</li>
          <li className="hover:text-gray-800 transition">📷 Instagram</li>
          <li className="hover:text-gray-800 transition">📷 Youtube</li>
        </ul>
      </div>

      <div className="col-span-4">
        <hr />
        <p className="py-5 text-sm text-center">
          © 2025 forever.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};
export default Footer;
