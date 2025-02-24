import { JSX, useState, useEffect, use } from "react";
import Header from "../Components/Header";
import axiosInstance from "../axiosInstance";
import { userStore } from "../Store/UserStore";
import { useNavigate } from "react-router-dom";

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  // State variables
  // Keeping track of the active tab
  const [activeTab, setActiveTab] = useState("tickets");

  useEffect(() => {
    userStore.user.firstName === "" && navigate("/login");
  }, []);
  // User data state
  const [userData, setUserData] = useState({
    email: userStore.user.email,
    password: "",
    firstName: userStore.user.firstName,
    lastName: userStore.user.lastName,
  });
  // State to keep track of unsaved changes
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    if (storedData) setUserData(JSON.parse(storedData));
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUnsavedChanges(true);
  };

  // Save changes to localStorage
  const handleSaveChanges = async () => {
    try {
      await userStore.updateUserData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
      setUnsavedChanges(false);
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const handleSignOut = async () => {
    try {
      const res = axiosInstance.post("/users/logout");
      // Clear user data from mobx store
      userStore.clearUserData();
      // redirect home
      navigate("/");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <Header />

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 my-6 rounded-lg shadow-lg">
        {/* Nav bar */}
        <h1 className="text-3xl font-bold mb-4">My Account</h1>
        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`p-3 w-1/3 text-center ${
              activeTab === "tickets" ? "border-b-4 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("tickets")}
          >
            My Tickets
          </button>
          <button
            className={`p-3 w-1/3 text-center ${
              activeTab === "profile" ? "border-b-4 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`p-3 w-1/3 text-center ${
              activeTab === "signout" ? "border-b-4 border-red-500" : ""
            }`}
            onClick={() => setActiveTab("signout")}
          >
            Sign Out
          </button>
        </div>
        {/* Tabs */}
        {/* Tickets */}
        {activeTab === "tickets" && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Your Tickets</h2>
            <p className="text-gray-400">No tickets purchased yet.</p>
          </div>
        )}
        {/* Profile */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  id="firstName"
                />
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  id="lastName"
                />
              </div>
              <div>
                <label className="block text-sm mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  id="email"
                />
              </div>
              {/* <div>
                <label className="block text-sm mb-1" htmlFor="country">
                  Country
                </label>
                <input
                  type="text"
                  name="countryOfResidence"
                  value={userData.countryOfResidence}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  id="country"
                />
              </div> */}
            </div>
            {unsavedChanges && (
              <button
                onClick={handleSaveChanges}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            )}
            {showSavedMessage && (
              <p className="text-green-400 mt-2">Changes saved successfully!</p>
            )}
          </div>
        )}
        {/* Sign Out */}
        {activeTab === "signout" && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Sign Out</h2>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
