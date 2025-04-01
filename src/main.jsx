import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);

// <BrowserRouter>: ห่อแอปเพื่อให้ใช้ routing ได้
// <ShopContextProvider>: ห่อ App.jsx ด้วย ShopContextProvider ทำให้ทุกหน้า (เช่น Cart, Product) เข้าถึงฟังก์ชันและ state ได้
