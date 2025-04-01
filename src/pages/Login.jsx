import { ShopContext } from "@/context/ShopContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token); // ถ้าสำเร็จ: อัปเดต token และบันทึกใน localStorage
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
      if (currentState === "Login") {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.msg || "Login failed");
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/"); // ถ้ามี token: นำไปหน้าแรก (/)
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-center text-sm mt-[-8px]">
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("Sign Up")}>Create account</p>
        ) : (
          <p onClick={() => setCurrentState("Login")}>Login Here</p>
        )}
      </div>
      <button className="bg-[#034694] text-white font-light px-8 py-4 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};
export default Login;
