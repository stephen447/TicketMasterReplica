import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CartSummary from "../../Components/CartSummary";
import { CartItem } from "../../types";

// Mock functions for removeFromCart, updateQuantity, and onNext
const mockRemoveFromCart = jest.fn();
const mockUpdateQuantity = jest.fn();
const mockOnNext = jest.fn();

// Sample cart data
const cart: CartItem[] = [
  {
    id: 1,
    eventTitle: "Concert A",
    name: "Ticket 1",
    price: 50,
    quantity: 2,
    addedAt: new Date(),
  },
  {
    id: 2,
    eventTitle: "Concert B",
    name: "Ticket 2",
    price: 30,
    quantity: 1,
    addedAt: new Date(),
  },
];

describe("CartSummary", () => {
  beforeEach(() => {
    // Clear mocks before each test
    mockRemoveFromCart.mockClear();
    mockUpdateQuantity.mockClear();
    mockOnNext.mockClear();
  });

  it("renders the cart summary correctly", () => {
    render(
      <CartSummary
        cart={cart}
        removeFromCart={mockRemoveFromCart}
        updateQuantity={mockUpdateQuantity}
        onNext={mockOnNext}
      />
    );

    // Check if the cart items are rendered
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Concert A")).toBeInTheDocument();
    expect(screen.getByText("Ticket 1")).toBeInTheDocument();
    expect(screen.getByText("Price: €50.00")).toBeInTheDocument();
    expect(screen.getAllByText("Quantity:")[0]).toBeInTheDocument();
    expect(screen.getByText("Concert B")).toBeInTheDocument();
    expect(screen.getByText("Ticket 2")).toBeInTheDocument();
    expect(screen.getByText("Price: €30.00")).toBeInTheDocument();
  });

  it("displays a message if the cart is empty", () => {
    render(
      <CartSummary
        cart={[]}
        removeFromCart={mockRemoveFromCart}
        updateQuantity={mockUpdateQuantity}
        onNext={mockOnNext}
      />
    );

    expect(
      screen.getByText("Your cart is empty. Add some tickets!")
    ).toBeInTheDocument();
  });

  it("calls removeFromCart when the 'Remove' button is clicked", () => {
    render(
      <CartSummary
        cart={cart}
        removeFromCart={mockRemoveFromCart}
        updateQuantity={mockUpdateQuantity}
        onNext={mockOnNext}
      />
    );

    fireEvent.click(screen.getAllByText("Remove")[0]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1, "Ticket 1");

    fireEvent.click(screen.getAllByText("Remove")[1]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(2, "Ticket 2");
  });

  it("calls updateQuantity when quantity input is changed", () => {
    render(
      <CartSummary
        cart={cart}
        removeFromCart={mockRemoveFromCart}
        updateQuantity={mockUpdateQuantity}
        onNext={mockOnNext}
      />
    );

    const quantityInput = screen.getAllByLabelText("Quantity:")[0];
    fireEvent.change(quantityInput, { target: { value: "3" } });

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("calls onNext when 'Proceed to Checkout' button is clicked", () => {
    render(
      <CartSummary
        cart={cart}
        removeFromCart={mockRemoveFromCart}
        updateQuantity={mockUpdateQuantity}
        onNext={mockOnNext}
      />
    );

    fireEvent.click(screen.getByText("Proceed to Checkout"));
    expect(mockOnNext).toHaveBeenCalled();
  });

  it("calculates and displays the correct total price", () => {
    render(
      <CartSummary
        cart={cart}
        removeFromCart={mockRemoveFromCart}
        updateQuantity={mockUpdateQuantity}
        onNext={mockOnNext}
      />
    );

    const totalPriceElement = screen.getByText("Total: €130.00");
    expect(totalPriceElement).toBeInTheDocument();
  });
});
