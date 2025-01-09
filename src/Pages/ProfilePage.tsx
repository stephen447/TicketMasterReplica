import { JSX } from "react";
import { useState, useEffect } from "react";

export default function ProfilePage(): JSX.Element {
  const [activeTab, setActiveTab] = useState("tickets");
  const [userData, setUserData] = useState({
    email: "sdavidbyrne@gmail.com",
    password: "Mclass11//",
    firstName: "David",
    lastName: "Byrne",
    countryOfResidence: "USA",
  });
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [tempTab, setTempTab] = useState<string | null>(null);

  // Fetch user data
  useEffect(() => {
    console.log("Fetch user data");
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUnsavedChanges(true); // Mark changes as unsaved
  };

  // Save changes and reset unsaved changes
  const handleSaveChanges = () => {
    console.log("Changes saved:", userData);
    setUnsavedChanges(false); // Reset unsaved changes
    if (tempTab) {
      setActiveTab(tempTab);
      setTempTab(null);
    }
  };

  // Confirm tab change
  const confirmTabChange = () => {
    if (unsavedChanges) {
      const proceed = window.confirm(
        "You have unsaved changes. Do you want to leave without saving?"
      );
      if (proceed && tempTab) {
        setActiveTab(tempTab);
        setUnsavedChanges(false);
        setTempTab(null);
      }
    } else if (tempTab) {
      setActiveTab(tempTab);
    }
  };

  // Tab click handler
  const handleTabClick = (tab: string) => {
    if (unsavedChanges) {
      setTempTab(tab); // Store the clicked tab temporarily
      confirmTabChange(); // Prompt the user
    } else {
      setActiveTab(tab); // Switch directly if no unsaved changes
    }
  };

  return (
    <div>
      <p>Profile</p>
      <div>
        {/* Tickets dropdown */}
        <button onClick={() => handleTabClick("tickets")}>Tickets</button>
        {/* Profile */}
        <button onClick={() => handleTabClick("profile")}>Profile</button>
        {/* Sign out */}
        <button onClick={() => handleTabClick("signout")}>Sign Out</button>
      </div>
      <div>
        {activeTab === "tickets" ? (
          <div>
            <p>My Tickets</p>
            <p>Title</p>
            <p>Description</p>
            <button>Find Tickets</button>
          </div>
        ) : activeTab === "profile" ? (
          <div>
            <p>Profile</p>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
            />
            <label htmlFor="countryOfResidence">Country of Residence:</label>
            <input
              type="text"
              id="countryOfResidence"
              name="countryOfResidence"
              value={userData.countryOfResidence}
              onChange={handleInputChange}
            />
            {unsavedChanges && (
              <button onClick={handleSaveChanges}>Confirm Changes</button>
            )}
          </div>
        ) : (
          <div>
            <p>Sign Out</p>
          </div>
        )}
      </div>
    </div>
  );
}
