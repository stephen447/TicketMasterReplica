import React, { useState, useEffect, JSX } from "react";
import { useParams } from "react-router-dom";
import { groupTicket, Event, CartItem } from "../types";

import Header from "../Components/Header";
import EventData from "../SampleData/Events.json";

interface TicketsPageProps {
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function TicketsPage({
  setCart,
}: TicketsPageProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [ticketOptions, setTicketOptions] = useState<groupTicket[]>([]);
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<groupTicket | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);

  /**
   * This update the cart object with the new item
   * @param item CartItem - The item to be added to the cart
   */
  const addToCart = (item: CartItem) => {
    setCart((prevCart: CartItem[]) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find(
        (cartItem: CartItem) =>
          cartItem.id === item.id && cartItem.name === item.name
      );

      // If the item already exists, increase the quantity
      if (existingItem) {
        // If the item already exists (same event ID and ticket name), increase the quantity
        return prevCart.map((cartItem: CartItem) =>
          cartItem.id === item.id && cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
                addedAt: new Date(),
              }
            : cartItem
        );
      } else {
        // If the item doesn't exist, add it to the cart
        return [...prevCart, item];
      }
    });
  };

  // Fetch event details based on the ID
  useEffect(() => {
    async function fetchEventDetails() {
      // Event ID is received from the URL
      const eventID: number = parseInt(id || "0");
      // Find the event based on the ID
      const event = EventData.find((event: Event) => event.id === eventID);
      setTicketOptions(event?.tickets || []);
      setEventDetails(event || null);
    }
    fetchEventDetails();
  }, [id]);

  // Handle ticket selection
  function handleTicketSelection(ticket: groupTicket) {
    setSelectedTicket(ticket);
    setQuantity(1); // Reset quantity when selecting a new ticket
  }

  // Handle quantity change
  function handleQuantityChange(value: number) {
    if (
      selectedTicket &&
      value <= selectedTicket.availability &&
      value > 0 &&
      value <= 4
    ) {
      setQuantity(value);
    }
  }

  // Calculate total price
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  if (!eventDetails) return <div>Loading event details...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Header />
      <div className="container mx-auto px-6 py-8">
        {/* Event Details */}
        <h1 className="text-3xl font-bold text-gray-900">
          {eventDetails.title}
        </h1>
        <p className="text-gray-600">{eventDetails.date}</p>
        <p className="text-gray-600">{eventDetails.city}</p>
        <p className="mt-4 text-gray-800">{eventDetails.description}</p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Select Your Tickets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {ticketOptions.map((ticket, index) => (
              <button
                key={ticket.name}
                onClick={() => handleTicketSelection(ticket)}
                className={`p-4 border rounded-lg ${
                  selectedTicket?.name === ticket.name
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <h3 className="text-lg font-bold text-gray-900">
                  {ticket.name}
                </h3>
                <p className="text-gray-600">€{ticket.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  {eventDetails.tickets[index].availability} available
                </p>
              </button>
            ))}
          </div>
        </div>
        {/* When ticket selected, display pricing and quantity details */}
        {selectedTicket && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Ticket Details
            </h2>
            <div className="mt-4">
              <p>
                <strong>Selected Ticket:</strong> {selectedTicket.name}
              </p>
              <p>
                <strong>Price:</strong> €{selectedTicket.price.toFixed(2)} per
                ticket
              </p>
              <div className="mt-4">
                <label htmlFor="quantity" className="block text-gray-700">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={"4"}
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="mt-2 p-2 border rounded-md w-20"
                />
              </div>
              <p className="mt-4 text-lg font-bold text-gray-900">
                Total: €{totalPrice.toFixed(2)}
              </p>
              <button
                onClick={() =>
                  addToCart({
                    id: eventDetails.id,
                    name: selectedTicket.name,
                    price: selectedTicket.price,
                    quantity: quantity,
                    eventTitle: eventDetails.title,
                    addedAt: new Date(),
                  })
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
