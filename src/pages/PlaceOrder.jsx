import { assets } from "@/assets/assets";
import CartTotal from "@/components/CartTotal";
import Title from "@/components/Title";
import { ShopContext } from "@/context/ShopContext";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  // เก็บข้อมูลที่อยู่สำหรับจัดส่ง
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // อัปเดต formData เมื่อผู้ใช้กรอกข้อมูลในฟอร์ม
  const onChangeHandler = (event) => {
    const name = event.target.name; // ชื่อของแต่ละฟิลด์
    const value = event.target.value; // ค่าที่ผู้ใช้พิมพ์
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // ส่งคำขอไป /api/order/stripe และ redirect ไปหน้า Stripe
  const handleStripePayment = async (orderData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/stripe`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        // ถ้าสำเร็จ: Redirect ไปยัง session_url ที่ได้จาก backend
        window.location.href = response.data.session_url;
      } else {
        toast.error(
          response.data.message || "Failed to initiate Stripe payment"
        );
      }
    } catch (error) {
      toast.error("An error occurred while initiating Stripe payment");
    }
  };

  // ส่งคำขอไป /api/order/place (COD) หรือเรียก handleStripePayment (Stripe)
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!token) {
      toast.error("Please log in to place an order");
      navigate("/login");
      return;
    }
    // Validate form data
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "street",
      "city",
      "state",
      "zipcode",
      "country",
      "phone",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    } // ถ้ามีฟิลด์ไหนที่ไม่ได้กรอกจะ error

    // Construct order items
    if (!products || products.length === 0) {
      toast.error("No products available");
      return;
    }
    if (Object.keys(cartItems).length === 0) {
      toast.error("Cart is empty");
      return;
    }

    // Loop ผ่าน cartItems เพื่อสร้าง array ของสินค้าในคำสั่งซื้อ
    const orderItems = [];
    for (const itemId in cartItems) {
      const numericItemId = Number(itemId);
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const itemInfo = products.find((p) => p.id === numericItemId);
          if (itemInfo) {
            orderItems.push({
              itemId: numericItemId,
              name: itemInfo.name,
              price: itemInfo.price,
              size: size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
    }

    if (orderItems.length === 0) {
      toast.error("No valid items in cart");
      return;
    }

    // Validate amount
    const cartAmount = getCartAmount();
    if (typeof cartAmount !== "number" || isNaN(cartAmount)) {
      toast.error("Invalid cart amount calculation");
      return;
    }
    if (typeof delivery_fee !== "number" || isNaN(delivery_fee)) {
      toast.error("Invalid delivery fee");
      return;
    }
    const amount = cartAmount + delivery_fee;

    // Validate payment method
    if (!["cod", "stripe"].includes(method)) {
      toast.error("Invalid payment method");
      return;
    }

    const address = { ...formData };

    const orderData = {
      items: orderItems,
      amount,
      address,
      paymentMethod: method,
    };

    try {
      if (method === "stripe") {
        await handleStripePayment(orderData);
        return;
      } else if (method === "cod") {
        const response = await fetch(`${backendUrl}/api/order/place`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });
        const data = await response.json();
        if (data.success) {
          setCartItems({});
          toast.success("Order placed successfully!");
          navigate("/orders");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred while placing the order");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* --- Left Side --- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"
          />
        </div>
      </div>

      {/* --- Right Side --- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-[#034694] text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
