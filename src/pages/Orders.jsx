import Title from "@/components/Title";
import { ShopContext } from "@/context/ShopContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const Orders = () => {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // ดึงข้อมูลคำสั่งซื้อของผู้ใช้จาก backend
  const loadOrderData = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // อัปเดต orderData ด้วยข้อมูลจาก response.data.data
        setOrderData(response.data.data);
      } else {
        console.error("Failed to load orders:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        console.log("Unauthorized - redirecting to login");
        navigate("/login");
      }
    }
  };

  // เรียก loadOrderData เมื่อ component โหลดและทุก 5 วินาทีถ้ามี token
  useEffect(() => {
    if (token) {
      loadOrderData();
      const interval = setInterval(() => {
        loadOrderData();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [token, backendUrl]);

  return (
    <div className="border-t pt-16 bg-white">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="space-y-4">
        {orderData.length === 0 ? (
          <p className="text-gray-500 py-4">No orders found.</p>
        ) : (
          orderData.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 mb-4 last:mb-0"
                >
                  <img
                    className="w-16 h-16 object-cover rounded"
                    src={item.product.image[0] || "placeholder-image-url"}
                    alt={item.product.name}
                    onError={(e) => (e.target.src = "placeholder-image-url")}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm md:text-base">
                      {item.product.name}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                      <p>
                        {currency}
                        {item.product.price}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <p>
                  Date:{" "}
                  <span className="text-gray-800">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
                <p>
                  Payment:{" "}
                  <span className="text-gray-800">{order.paymentMethod}</span>
                </p>
                <p>
                  Total:{" "}
                  <span className="text-gray-800">
                    {currency}
                    {order.amount}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p
                    className={`w-2 h-2 rounded-full ${
                      order.status === "Pending"
                        ? "bg-green-500"
                        : order.status === "Packing"
                        ? "bg-yellow-500"
                        : order.status === "Shipped"
                        ? "bg-blue-500"
                        : order.status === "Out for Delivery" ||
                          order.status === "Out for delivery"
                        ? "bg-red-500"
                        : order.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  ></p>
                  <p className="text-sm font-medium text-gray-800 capitalize">
                    {order.status || "Unknown"}
                  </p>
                </div>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 transition">
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;