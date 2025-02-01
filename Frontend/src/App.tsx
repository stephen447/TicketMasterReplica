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
import PrivacyPage from "./Pages/PrivacyPage";
import { Provider } from "mobx-react";
import { cartStore } from "./Store/CartStore";
import { userStore } from "./Store/UserStore";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Stripe public key
const stripePromise = loadStripe(
  "pk_test_51QHVpbFGsC2hbdSGjBy7vbvItr7e0Yl6V8GGDpu6j09aWcxIvork7KApbpMIZyYOE6PLYShBKYXAuXNDLrhgnvSm00lp1lWQHb"
);

export default function App() {
  const EXPIRATION_TIME = 60 * 1000; // Expiration time for the cart
  // State to hold the cart, initialized from localStorage - TODO fetch from server/ MOBX store
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  /**
   * Function for removing expired items from the cart
   */
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

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Function to remove an event from the cart by id and name
   * @param id - event id
   * @param name - the name of the ticket - standing, general etc.
   */
  const removeFromCart = (id: number, name: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id || item.name !== name)
    );
  };

  /**
   * Function for updating the quantity of an event in the cart
   * @param id - event id
   * @param quantity - new quantity
   */
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Use effect for testing user information
  useEffect(() => {
    // Fetch user data and store in the mobx store including their tickets
    userStore.setUserData({
      firstName: "John",
      lastName: "Doe",
      email: "test@gmail.com",
      phone: "86064",
    });
  }, []);

  return (
    <Provider cartStore={cartStore} userStore={userStore}>
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
              <Elements stripe={stripePromise}>
                <CheckOutPage
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              </Elements>
            }
          />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
