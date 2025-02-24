import { JSX, useEffect } from "react";
import Header from "../Components/Header";
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { userStore } from "../Store/UserStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // If already signed in, redirect to profile page
  useEffect(() => {
    userStore.user.firstName !== "" && navigate("/profile");
  }, []);

  /**
   * Function to handle the sign in process
   */
  async function handleSignIn(): Promise<void> {
    try {
      const res = await axiosInstance.post("/users/login", {
        email: email,
        password: password,
      });

      // Update the state in mobx store for the header
      userStore.setUserData({
        id: res.data.user.id,
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        email: res.data.user.email,
      });

      // Redirect to home page
      navigate("/");
      console.log("res", res);
    } catch (error) {
      console.error("Error signing in", error);
      setError("Invalid username or password");
      setEmail("");
      setPassword("");
    }
  }

  /**
   * Function to handle the forgot password process
   */
  function handleForgotPassword(): void {
    console.log("Forgot Password");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col flex-grow justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Sign In to Your Account
          </h1>
          {/* Form */}
          <form className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="button"
                onClick={handleSignIn}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="text-red-600 text-center w-[100%]">{error}</p>
          <div className="my-6 border-t border-gray-300"></div>

          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <a
              href="/create-account"
              className="text-blue-600 hover:underline font-semibold"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
