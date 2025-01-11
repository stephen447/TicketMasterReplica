import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/stephen447" // Replace with your GitHub profile URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Visit my GitHub profile"
              >
                <i className="fab fa-github"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/stephen-byrne-b4729321b/" // Replace with your LinkedIn profile URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Visit my LinkedIn Profile"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://stephenbyrne.onrender.com/" // Replace with your actual website URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Visit my Personal Website"
              >
                <i className="fas fa-globe"></i>{" "}
                {/* Suitable icon for a personal website */}
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="text-gray-400 hover:text-white transition"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-400 hover:text-white transition"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <form>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg text-gray-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Eventure. All rights reserved.
          </p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms
            </a>
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm"
            >
              Privacy
            </a>
            <a
              href="/cookies"
              className="text-gray-400 hover:text-white text-sm"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
