import React, { useState } from "react";
import CartSummary from "../Components/CartSummary";
import PersonalInfoForm from "../Components/PersonalInformation";
import PaymentForm from "../Components/PaymentForm"; // Uncommented import
import { CartItem, PersonalInfo } from "../types";
import Header from "../Components/Header";

// Props for the Checkout component
interface CheckoutProps {
  cart: CartItem[];
  removeFromCart: (id: number, name: string) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  cart,
  removeFromCart,
  updateQuantity,
}) => {
  const [step, setStep] = useState(1); // step state for step in checkout process
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null); // state for personel info of user

  // Calculate the total amount of the items in the cart
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /**
   * Function for handling the next step in the checkout process
   * @param data PersonalInfo - object containing personal information of user
   */
  const handleNext = (data?: PersonalInfo) => {
    if (data) {
      setPersonalInfo(data);
    }
    setStep((prev) => prev + 1);
  };

  /**
   * Function for handling the payment success
   */
  const handlePaymentSuccess = () => {
    console.log("Payment Successful! Order confirmed.");
    setStep(4); // Go to the confirmation screen
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}

        {/* Cart Summary */}
        {step === 1 && (
          <CartSummary
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            onNext={() => handleNext()} // Pass handleNext to proceed to the next step
          />
        )}
        {/* Personal Information */}
        {step === 2 && <PersonalInfoForm onNext={handleNext} />}
        {/* Stripe Payment */}
        {step === 3 && (
          <PaymentForm
            totalAmount={totalAmount}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
        {/* Confirmation */}
        {step === 4 && (
          <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p>Your order has been confirmed. Enjoy the event!</p>
          </div>
        )}
        {/* Navigation buttons */}
        {step > 1 && step < 4 && (
          <button
            className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
