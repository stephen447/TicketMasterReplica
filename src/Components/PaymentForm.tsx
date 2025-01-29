// import React from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// interface PaymentFormProps {
//   totalAmount: number;
//   onPaymentSuccess: () => void;
// }

// const PaymentForm: React.FC<PaymentFormProps> = ({
//   totalAmount,
//   onPaymentSuccess,
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     if (cardElement) {
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//       });

//       if (error) {
//         console.error("Payment error:", error.message);
//       } else {
//         console.log("Payment successful:", paymentMethod);
//         onPaymentSuccess();
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Payment</h2>
//       <p className="mb-4">Total: ${totalAmount.toFixed(2)}</p>
//       <div className="mb-4 border p-2 rounded">
//         <CardElement />
//       </div>
//       <button
//         type="submit"
//         disabled={!stripe}
//         className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//       >
//         Pay Now
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;
