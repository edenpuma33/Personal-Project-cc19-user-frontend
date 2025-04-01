import { assets } from "@/assets/assets";
import { ShopContext } from "@/context/ShopContext";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaChevronLeft } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { BsBasket3Fill } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const [visible, setVisible] = useState(false); // ควบคุมเมนู sidebar ในมือถือ

  const context = useContext(ShopContext);
  if (!context) {
    console.error(
      "Navbar: ShopContext is undefined. Ensure Navbar is wrapped in ShopContextProvider."
    );
    return <div>Loading...</div>; // Fallback UI
  }

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems([]);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium bg-[#001489]">
      <Link to="/">
        <img src={assets.logo_chelsea} className="w-36" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-8 text-lg font-medium text-[#ffffff]">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#dba111] hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#dba111] hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#dba111] hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#dba111] hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <FaSearch
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer text-white"
        />
        <div className="group relative">
          <IoPersonSharp
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer text-white"
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <BsBasket3Fill className="w-5 min-w-5 text-white" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#dba111] text-black font-bold aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <IoMdMenu
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden text-white"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <FaChevronLeft className="h-4 text-black" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
