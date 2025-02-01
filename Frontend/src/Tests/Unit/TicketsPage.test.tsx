import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TicketsPage from "../../Pages/TicketsPage";
import { CartItem } from "../../types";
import EventData from "../../SampleData/Events.json";

// Mock useParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

describe("TicketsPage", () => {
  let mockSetCart: jest.Mock;

  beforeEach(() => {
    mockSetCart = jest.fn();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={["/tickets/1"]}>
        <Routes>
          <Route
            path="/tickets/:id"
            element={<TicketsPage setCart={mockSetCart} />}
          />
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders event details correctly", async () => {
    renderComponent();
    await waitFor(() =>
      expect(screen.getByText(EventData[0].title)).toBeInTheDocument()
    );
    expect(screen.getByText(EventData[0].date)).toBeInTheDocument();
    expect(screen.getByText(EventData[0].city)).toBeInTheDocument();
  });

  test("displays ticket options", async () => {
    renderComponent();
    await waitFor(() =>
      expect(screen.getByText(EventData[0].tickets[0].name)).toBeInTheDocument()
    );
    expect(
      screen.getByText(`€${EventData[0].tickets[0].price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  test("allows ticket selection", async () => {
    renderComponent();
    await waitFor(() =>
      expect(screen.getByText(EventData[0].tickets[0].name)).toBeInTheDocument()
    );
    const ticketButton = screen.getByText(EventData[0].tickets[0].name);
    fireEvent.click(ticketButton);
    expect(screen.getByText("Ticket Details")).toBeInTheDocument();
  });

  test("updates quantity input correctly", async () => {
    renderComponent();
    await waitFor(() =>
      expect(screen.getByText(EventData[0].tickets[0].name)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText(EventData[0].tickets[0].name));
    const quantityInput = screen.getByLabelText(
      "Quantity:"
    ) as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: "3" } });
    expect(quantityInput.value).toBe("3");
  });

  test("quantity bounds for tickets are inforced", async () => {
    renderComponent();
    await waitFor(() =>
      expect(screen.getByText(EventData[0].tickets[0].name)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText(EventData[0].tickets[0].name));
    const quantityInput = screen.getByLabelText(
      "Quantity:"
    ) as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: "5" } });
    expect(quantityInput.value).toBe("1");
  });

  test("quantity bounds for tickets are inforced", async () => {
    renderComponent();
    await waitFor(() =>
      expect(screen.getByText(EventData[0].tickets[0].name)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText(EventData[0].tickets[0].name));
    const quantityInput = screen.getByLabelText(
      "Quantity:"
    ) as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: "-1" } });
    expect(quantityInput.value).toBe("1");
  });

  test("adds ticket to cart on button click", async () => {
    renderComponent();
    await waitFor(() =>
      expect(screen.getByText(EventData[0].tickets[0].name)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText(EventData[0].tickets[0].name));
    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockSetCart).toHaveBeenCalled();
  });

  test("calculates total price correctly when multiple tickets are added", async () => {
    renderComponent();

    // Wait for tickets to load
    await waitFor(() =>
      expect(screen.getByText(EventData[0].tickets[0].name)).toBeInTheDocument()
    );

    // Select first ticket
    fireEvent.click(screen.getByText(EventData[0].tickets[0].name));

    // Set quantity to 2
    const quantityInput = screen.getByLabelText(
      "Quantity:"
    ) as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: "2" } });

    // Verify the total price
    const totalPrice = EventData[0].tickets[0].price * 2;

    expect(
      screen.getByText(`Total: €${totalPrice.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  test("calculates total price correctly when multiple tickets are added for 2nd ticket type", async () => {
    renderComponent();

    // Wait for tickets to load
    await waitFor(() =>
      expect(screen.getByText(EventData[0].tickets[0].name)).toBeInTheDocument()
    );

    // Select first ticket
    fireEvent.click(screen.getByText(EventData[0].tickets[1].name));

    // Set quantity to 2
    const quantityInput = screen.getByLabelText(
      "Quantity:"
    ) as HTMLInputElement;
    fireEvent.change(quantityInput, { target: { value: "3" } });

    // Verify the total price
    const totalPrice = EventData[0].tickets[1].price * 3;

    expect(
      screen.getByText(`Total: €${totalPrice.toFixed(2)}`)
    ).toBeInTheDocument();
  });
});
