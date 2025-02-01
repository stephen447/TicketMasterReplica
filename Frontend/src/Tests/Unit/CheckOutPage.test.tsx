import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Checkout from "../../Pages/CheckOutPage";
import { CartItem } from "../../types";

// Mock CartSummary, PersonalInfoForm, and Header
jest.mock("../../Components/CartSummary", () => ({
  __esModule: true,
  default: ({ onNext }: { onNext: () => void }) => (
    <div>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock("../../Components/PersonalInformation", () => ({
  __esModule: true,
  default: ({
    onNext,
  }: {
    onNext: (data: { firstName: string; lastName: string }) => void;
  }) => (
    <div>
      <button onClick={() => onNext({ firstName: "John", lastName: "Doe" })}>
        Next
      </button>
    </div>
  ),
}));

jest.mock("../../Components/Header", () => ({
  __esModule: true,
  default: () => <div>Header</div>,
}));

describe("Checkout Component", () => {
  const cart: CartItem[] = [
    {
      id: 1,
      name: "Item 1",
      price: 20,
      quantity: 1,
      eventTitle: "Event 1",
      addedAt: new Date(),
    },
    {
      id: 2,
      name: "Item 2",
      price: 30,
      quantity: 2,
      eventTitle: "Event 2",
      addedAt: new Date(),
    },
  ];

  const removeFromCart = jest.fn();
  const updateQuantity = jest.fn();

  it("renders CartSummary on step 1", () => {
    render(
      <Checkout
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument(); // From CartSummary
  });

  it("navigates to step 2 when 'Next' is clicked in step 1", async () => {
    render(
      <Checkout
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    );

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("Next")).toBeInTheDocument(); // From PersonalInfoForm
    });
  });

  it("navigates back to step 1 when 'Back' is clicked on step 2", async () => {
    render(
      <Checkout
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    );

    // First navigate to step 2
    fireEvent.click(screen.getByText("Next"));

    // Now navigate back to step 1
    fireEvent.click(screen.getByText("Back"));

    await waitFor(() => {
      expect(screen.getByText("Next")).toBeInTheDocument(); // From CartSummary
    });
  });

  it("navigates to step 3 after Personal Info is provided", async () => {
    render(
      <Checkout
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    );

    // First navigate to step 2
    fireEvent.click(screen.getByText("Next"));

    // Simulate providing personal info and click next
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(screen.getByText("Thank You!")).toBeInTheDocument();
    });
  });

  it("renders Thank You message on step 3", async () => {
    render(
      <Checkout
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    );

    // First navigate to step 2
    fireEvent.click(screen.getByText("Next"));

    // Simulate providing personal info and click next
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(
        screen.getByText("Your order has been confirmed.")
      ).toBeInTheDocument();
    });
  });

  it("does not show 'Back' button on step 1", () => {
    render(
      <Checkout
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    );

    expect(screen.queryByText("Back")).not.toBeInTheDocument();
  });

  it("handles successful payment", async () => {
    // If you uncommented PaymentForm and added its logic:
    render(
      <Checkout
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    );

    // Assume payment step happens here and payment is successful
    fireEvent.click(screen.getByText("Next")); // Goes to step 2
    fireEvent.click(screen.getByText("Next")); // Goes to step 3 (Thank you message)

    // Ensure the "Thank You" message is rendered
    await waitFor(() => {
      expect(
        screen.getByText("Your order has been confirmed.")
      ).toBeInTheDocument();
    });
  });
});
