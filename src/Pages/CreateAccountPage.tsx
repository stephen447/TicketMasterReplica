import { JSX } from "react";
import { useState } from "react";
import Header from "../Components/Header";

export default function CreateAccountPage(): JSX.Element {
  const [error, setError] = useState("");

  /**
   * This function is called when the sign up button is clicked
   */
  function handleSignUp() {
    console.log("Sign Up");
    // Example error handling
    if (!document.getElementById("email")) {
      setError("Email is required.");
    } else {
      setError("");
    }
  }

  /**
   * This function is called when the sign in button is clicked
   */
  function handleSignIn() {
    console.log("Sign In");
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <div className="flex items-center justify-center flex-grow bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
              />
            </div>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label
                htmlFor="countryOfResidence"
                className="block text-sm font-medium text-gray-700"
              >
                Country Of Residence
              </label>
              <input
                type="text"
                id="countryOfResidence"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your country of residence"
              />
            </div>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

            <button
              type="button"
              onClick={handleSignUp}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={handleSignIn}
              className="text-blue-600 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
