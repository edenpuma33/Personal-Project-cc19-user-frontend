import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />  {/* /: หน้าแรก (Home) */}
        <Route path="/collection" element={<Collection />} /> {/* /collection: หน้ารายการสินค้า (Collection) */}
        <Route path="/about" element={<About />} /> {/* /about: หน้าเกี่ยวกับ (About) */}
        <Route path="/contact" element={<Contact />} /> {/* /contact: หน้าติดต่อ (Contact) */}
        <Route path="/product/:id" element={<Product />} /> {/* /product/:id: หน้ารายละเอียดสินค้า (รับ id เป็นพารามิเตอร์) */}
        <Route path="/cart" element={<Cart />} /> {/* /cart: หน้ารถเข็น (Cart) */}
        <Route path="/login" element={<Login />} /> {/* /login: หน้า login/signup (Login) */}
        <Route path="/place-order" element={<PlaceOrder />} /> {/* /place-order: หน้าชำระเงิน (PlaceOrder) */}
        <Route path="/orders" element={<Orders />} /> {/* /orders: หน้าประวัติคำสั่งซื้อ (Orders) */}
        <Route path="/verify" element={<Verify />} /> {/* /verify: หน้ายืนยันการชำระเงิน Stripe (Verify)*/}
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
