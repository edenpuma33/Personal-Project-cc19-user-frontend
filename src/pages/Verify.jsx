import { ShopContext } from "@/context/ShopContext";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  // ดึง success และ orderId จาก URL
  const verifyPayment = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!success || !orderId) {
      toast.error("Invalid payment verification data");
      navigate("/cart");
      return;
    }

    try {
      const response = await axios.get(
        `${backendUrl}/api/order/verifyStripe?success=${success}&orderId=${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // เรียก API เพื่อยืนยันการชำระเงิน ถ้าสำเร็จ: ล้างรถเข็นและไป /orders
      if (response.data.success) {
        setCartItems({});
        toast.success("Payment verified successfully!");
        navigate("/orders");
      } else {
        toast.error(response.data.message || "Payment verification failed");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error(
        "An error occurred while verifying payment: " + error.message
      );
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token, success, orderId]);

  return <div className="min-h-screen"></div>;
};

export default Verify;
