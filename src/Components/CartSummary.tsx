import React from "react";
import { CartItem } from "../types";

interface CartSummaryProps {
  cart: CartItem[];
  removeFromCart: (id: number, name: string) => void;
  updateQuantity: (id: number, quantity: number) => void;
  onNext: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cart,
  removeFromCart,
  updateQuantity,
  onNext,
}) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some tickets!</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.eventTitle}</h3>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>Price: €{item.price.toFixed(2)}</p>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="ml-2 w-16 border"
                    />
                  </label>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.name)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-lg font-bold">Total: €{totalPrice.toFixed(2)}</p>
            <button
              onClick={onNext}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
