import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import CreateAccountPage from "../../Pages/CreateAccountPage";

// Helper function to fill in the form
const fillForm = ({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  countryOfResidence,
}: {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  countryOfResidence?: string;
}) => {
  if (email)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: email },
    });
  if (password)
    fireEvent.change(screen.getAllByLabelText(/password/i)[0], {
      target: { value: password },
    });
  if (confirmPassword)
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: confirmPassword },
    });
  if (firstName)
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: firstName },
    });
  if (lastName)
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: lastName },
    });
  if (countryOfResidence)
    fireEvent.change(screen.getByLabelText(/country of residence/i), {
      target: { value: countryOfResidence },
    });
};

describe("CreateAccountPage", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        {" "}
        {/* Wrap the component with BrowserRouter */}
        <CreateAccountPage />
      </BrowserRouter>
    );
  });

  it("renders the form", () => {
    // Check if all form elements are rendered correctly
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country of residence/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when fields are missing", async () => {
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      //expect(screen.getAllByText(/password is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/confirm password is required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/country of residence is required/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error when passwords do not match", async () => {
    fillForm({
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password456", // Mismatched passwords
      firstName: "John",
      lastName: "Doe",
      countryOfResidence: "USA",
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
    });
  });

  it("submits the form successfully when all fields are valid", async () => {
    const mockHandleSignUp = jest.fn();

    // Replace the handleSignUp function with a mock
    const { container } = render(
      <BrowserRouter>
        {" "}
        {/* Wrap the component with BrowserRouter */}
        <CreateAccountPage />
      </BrowserRouter>
    );
    container
      .querySelector("form")
      ?.addEventListener("submit", mockHandleSignUp);

    fillForm({
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
      firstName: "John",
      lastName: "Doe",
      countryOfResidence: "USA",
    });

    fireEvent.click(screen.getAllByRole("button", { name: /sign up/i })[1]);

    await waitFor(() => {
      expect(mockHandleSignUp).toHaveBeenCalledTimes(1);
    });
  });

  it("does not submit the form if there are validation errors", async () => {
    const mockHandleSignUp = jest.fn();

    // Replace the handleSignUp function with a mock
    const { container } = render(
      <BrowserRouter>
        {" "}
        {/* Wrap the component with BrowserRouter */}
        <CreateAccountPage />
      </BrowserRouter>
    );
    container
      .querySelector("form")
      ?.addEventListener("submit", mockHandleSignUp);

    // Submit the form with missing fields
    const submitButton = screen.getAllByRole("button", { name: /sign up/i });
    submitButton[0].click();

    await waitFor(() => {
      expect(mockHandleSignUp).not.toHaveBeenCalled();
    });
  });
});
