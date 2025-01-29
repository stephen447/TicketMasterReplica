import { JSX } from "react";
import Header from "../Components/Header";
import { useState } from "react";
export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  /**
   * Sends requestion to the backend to sign in
   */
  function handleSignIn() {
    console.log("Sign In");
  }

  /**
   * Sends requestion to the backend to send reset password link to the user
   * @returns void
   */
  function handleForgotPassword() {
    console.log("Forgot Password");
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex flex-col flex-grow justify-center items-center bg-gray-100">
        {/* Login Card */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Sign In to Your Account
          </h1>
          <form className="space-y-4">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
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
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Separator */}
          <div className="my-6 border-t border-gray-300"></div>

          {/* Footer */}
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

      {/* Footer Component */}
      {/* <Footer /> */}
    </div>
  );
}
