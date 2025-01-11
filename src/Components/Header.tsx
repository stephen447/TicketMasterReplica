import { useEffect, useState } from "react";

function Header() {
  const [displayNav, setDisplayNav] = useState(window.innerWidth > 768);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDisplayNav(window.innerWidth < 768);
    });
  }, []);

  // Function to check if user is signed in, else display link to sign in page
  function checkSignedIn() {
    const isSignedIn = localStorage.getItem("user"); // Example check
    return isSignedIn ? (
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.reload(); // Refresh after sign-out
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Sign Out
      </button>
    ) : (
      <a
        href="/sign-in"
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
      >
        Sign In
      </a>
    );
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-blue-600">
          Eventure
        </a>
        {/* Navigation */}
        {displayNav ? (
          <nav className="flex gap-6 text-gray-700">
            <a
              href="/"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Concerts
            </a>
            <a
              href="/"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Sports
            </a>
            <a
              href="/"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Theater
            </a>
          </nav>
        ) : (
          <> </>
        )}

        {/* Sign In/Out Button */}
        <div>{checkSignedIn()}</div>
      </div>
    </header>
  );
}

export default Header;
