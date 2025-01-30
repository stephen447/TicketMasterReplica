import { render, screen, fireEvent } from "@testing-library/react";
import PersonalInfoForm from "../../Components/PersonalInformation"; // adjust path
import { PersonalInfo } from "../../types";

// Mocking the onNext function
const mockOnNext = jest.fn();

describe("PersonalInfoForm", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Ensure mock function is cleared before each test
  });

  test("renders the form with required fields", () => {
    render(<PersonalInfoForm onNext={mockOnNext} />);

    // Check if form fields and submit button are present
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Continue to Payment/i })
    ).toBeInTheDocument();
  });

  test("updates input values when typed in", () => {
    render(<PersonalInfoForm onNext={mockOnNext} />);

    // Type into the fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });

    // Check if the values are correctly updated
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue("John Doe");
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue(
      "john.doe@example.com"
    );
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue("1234567890");
  });

  test("calls onNext with correct data when form is submitted", () => {
    render(<PersonalInfoForm onNext={mockOnNext} />);

    // Type into the form fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });

    // Submit the form
    fireEvent.click(
      screen.getByRole("button", { name: /Continue to Payment/i })
    );

    // Assert that onNext has been called with the correct form data
    expect(mockOnNext).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
    });
  });

  test("does not call onNext if the form is not filled out", () => {
    render(<PersonalInfoForm onNext={mockOnNext} />);

    // Submit the form without filling out any fields
    fireEvent.click(
      screen.getByRole("button", { name: /Continue to Payment/i })
    );

    // Assert that onNext was not called
    expect(mockOnNext).toHaveBeenCalled();
  });
});
