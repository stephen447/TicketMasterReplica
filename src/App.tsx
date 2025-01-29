import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import CreateAccountPage from "./Pages/CreateAccountPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import TicketsPage from "./Pages/TicketsPage";
import CheckOutPage from "./Pages/CheckOutPage";
import { CartItem } from "./types";
import AboutUsPage from "./Pages/AboutUsPage";
import SupportPage from "./Pages/SupportPage";
import Terms from "./Pages/TermsPage";

export default function App() {
  const EXPIRATION_TIME = 60 * 1000; // 15 minutes in milliseconds
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Remove expired items from the cart
  const removeExpiredItems = () => {
    const now = Date.now();
    setCart((prevCart) =>
      prevCart.filter(
        (item) => now - new Date(item.addedAt).getTime() < EXPIRATION_TIME
      )
    );
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Check the cart once a minute and remove expired items
  useEffect(() => {
    const interval = setInterval(removeExpiredItems, 1 * 1000); // Run every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Need to update the database periodically to update the cart

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // Need to fetch the cart from the api server for the user

  // Remove an item from the cart by its ID
  const removeFromCart = (id: number, name: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id || item.name !== name)
    );
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route
          path="/tickets/:id"
          element={<TicketsPage setCart={setCart} />}
        />
        <Route
          path="/checkout"
          element={
            <CheckOutPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}
