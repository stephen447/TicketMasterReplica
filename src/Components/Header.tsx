import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { userStore } from "../Store/UserStore";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  userStore?: typeof userStore;
}

const Header: React.FC<UserProfileProps> = ({ userStore }) => {
  const [displayNav, setDisplayNav] = useState(window.innerWidth > 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setDisplayNav(window.innerWidth > 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Functionality for changing sign-in button to user info
  function checkSignedIn() {
    const isSignedIn = userStore?.fullName;
    console.log(typeof isSignedIn, isSignedIn);

    return isSignedIn != " " ? (
      <button
        onClick={() => navigate("/profile")}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Go to profile"
      >
        {isSignedIn}
      </button>
    ) : (
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        aria-label="Sign in to your account"
      >
        Sign In
      </button>
    );
  }

  return (
    <header className="bg-transparent shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Go to homepage"
        >
          Eventure
        </button>

        {/* Navigation */}
        {displayNav && (
          <nav role="navigation" aria-label="Main navigation">
            <ul className="flex gap-6 text-gray-700">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Go to Home page"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/search-results?category=concerts")}
                  className="hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="View Concerts category"
                >
                  Concerts
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/search-results?category=sports")}
                  className="hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="View Sports category"
                >
                  Sports
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/search-results?category=theater")}
                  className="hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="View Theater category"
                >
                  Theater
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/checkout")}
                  className="hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Go to Cart"
                >
                  Cart
                </button>
              </li>
            </ul>
          </nav>
        )}

        {/* Sign In/Out Button */}
        <div>{checkSignedIn()}</div>
      </div>
    </header>
  );
};

// Inject userStore and wrap with observer to react to store changes
export default inject("userStore")(observer(Header));
