import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", { name, email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", { email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (token) navigate("/");

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center px-4">
      <div className="flex flex-col gap-3 m-auto items-start p-6 sm:p-8 w-full max-w-[400px] border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold w-full text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="w-full text-center text-gray-500">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-primary" type="text" onChange={(e) => setName(e.target.value)} value={name} required placeholder="Enter your name" />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-primary" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required placeholder="Enter your email" />
        </div>

        <div className="w-full">
          <p>Password</p>
          <div className="relative">
            <input className="border border-zinc-300 rounded w-full p-2 mt-1 pr-10 focus:outline-primary" type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} required placeholder="Enter your password" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base hover:opacity-90 transition-opacity">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="w-full text-center">Already have an account? <span onClick={() => setState("Login")} className="text-primary underline cursor-pointer">Login here</span></p>
        ) : (
          <p className="w-full text-center">Create a new account? <span onClick={() => setState("Sign Up")} className="text-primary underline cursor-pointer">Click here</span></p>
        )}
      </div>
    </form>
  );
};

export default Login;