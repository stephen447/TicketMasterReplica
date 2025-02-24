import { useState } from "react";
import Header from "../Components/Header";
import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function CreateAccountPage(): JSX.Element {
  const navigate = useNavigate();
  // State to hold error messages
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  // State to manage form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  // Function to handle form submission
  function handleSignUp(event: React.FormEvent) {
    event.preventDefault(); // Prevent form from submitting

    // Create an errors object to store the validation errors
    let validationErrors = { ...errors };

    // Simple form validation
    // email
    if (!formData.email) {
      validationErrors.email = "Email is required.";
    } else {
      validationErrors.email = "";
    }
    // password
    if (!formData.password) {
      validationErrors.password = "Password is required.";
    } else {
      validationErrors.password = "";
    }

    // confirmPassword
    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords must match.";
    } else {
      validationErrors.confirmPassword = "";
    }

    // firstName
    if (!formData.firstName) {
      validationErrors.firstName = "First Name is required.";
    } else {
      validationErrors.firstName = "";
    }

    // lastName
    if (!formData.lastName) {
      validationErrors.lastName = "Last Name is required.";
    } else {
      validationErrors.lastName = "";
    }

    // If there are any errors, don't proceed with form submission
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setErrors(validationErrors);
      return; // Stop the function if validation fails
    }

    // Clear errors if validation passes
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });

    // Proceed with form submission logic (e.g., send data to server)
    try {
      axiosInstance.post("/users/register", {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        type: "user",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error signing up", error);
    }
  }

  function handleSignIn() {
    console.log("Sign In");
    navigate("/login");
  }

  // Function to handle input changes and update state
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-center flex-grow bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h1>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSignUp}>
            {/* Email */}
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
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
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
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            {/* confirm password */}
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
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            {/* first name */}
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
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your first name"
                required
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            {/* last name */}
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
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your last name"
                required
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
            {/* country of residence */}
            {/* <div>
              <label
                htmlFor="countryOfResidence"
                className="block text-sm font-medium text-gray-700"
              >
                Country Of Residence
              </label>
              <input
                type="text"
                id="countryOfResidence"
                value={formData.countryOfResidence}
                onChange={handleInputChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your country of residence"
                required
              />
              {errors.countryOfResidence && (
                <p className="text-sm text-red-500">
                  {errors.countryOfResidence}
                </p>
              )}
            </div> */}
            {/* submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
          {/* Sign In if already have an account*/}
          <p className="mt-4 text-center text-sm text-gray-600" role="link">
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
