import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// สร้าง ShopContext เป็นตัวแปร Context ที่จะถูกใช้ในคอมโพเนนต์อื่นผ่าน useContext(ShopContext)
export const ShopContext = createContext();

// Props: รับ props.children ซึ่งเป็นคอมโพเนนต์ลูกที่ห่อด้วย ShopContextProvider
const ShopContextProvider = (props) => {
  const currency = "£";
  const delivery_fee = 20;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  // Sync token with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getCartData(); // Fetch cart data when token is set
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  // ดึงข้อมูลตะกร้าสินค้าจาก backend (/api/cart/get)
  const getCartData = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        logout();
      }
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    if (!token) {
      toast.error("Please log in to add items to cart");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
          if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
          } else {
            cartData[itemId][size] = 1;
          }
        } else {
          cartData[itemId] = { [size]: 1 };
        }
        setCartItems(cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        logout();
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const updatedQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          logout();
        } else {
          toast.error(error.message);
        }
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product.id === Number(items));
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0 && itemInfo) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  // ล้างตะกร้า ส่งคำขอไป backend และอัปเดต cartItems เป็น {}
  const resetCart = async () => {
    if (!token) {
      toast.error("Please log in to reset your cart");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/reset`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setCartItems({});
        toast.success("Cart reset successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        logout();
      } else {
        toast.error(error.message);
      }
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Axios Error:", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // แชร์: State และฟังก์ชันทั้งหมดไปยังคอมโพเนนต์ลูก
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updatedQuantity,
    getCartAmount,
    resetCart,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
    getCartData,
    login,
    logout,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;