import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { userStore } from "../../Store/UserStore";
import axiosInstance from "../../axiosInstance";
import CreateAccountPage from "../../Pages/CreateAccountPage";

// Mock axiosInstance
jest.mock("../../axiosInstance", () => ({
  post: jest.fn(),
}));

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("CreateAccountPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create account form correctly", () => {
    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <CreateAccountPage />
        </MemoryRouter>
      </Provider>
    );

    // Check if email, password, and confirm password fields exist
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    // Check if buttons exist
    expect(
      screen.getAllByRole("button", { name: /create account/i })[0]
    ).toBeInTheDocument();
  });

  it("allows user to type into input fields", () => {
    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <CreateAccountPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    // Type into inputs
    fireEvent.change(emailInput, { target: { value: "newuser@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    // Check if values are updated
    expect(emailInput).toHaveValue("newuser@example.com");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });

  it("handles account creation success", async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValue({
      data: {
        user: {
          id: "2",
          firstName: "Jane",
          lastName: "Doe",
          email: "newuser@example.com",
        },
      },
    });

    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <CreateAccountPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const createAccountButton = screen.getAllByRole("button", {
      name: /create account/i,
    })[0];

    fireEvent.change(emailInput, { target: { value: "newuser@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(userStore.user.email).toBe("newuser@example.com");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("handles account creation failure", async () => {
    (axiosInstance.post as jest.Mock).mockRejectedValue(
      new Error("Email already exists")
    );

    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <CreateAccountPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getAllByLabelText(/password/i)[0];
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const createAccountButton = screen.getAllByRole("button", {
      name: /sign up/i,
    })[0];

    fireEvent.change(emailInput, {
      target: { value: "existinguser@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(screen.getByText("Email already exists")).toBeInTheDocument();
    });
  });

  it("triggers Forgot Password function on button click", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <CreateAccountPage />
        </MemoryRouter>
      </Provider>
    );

    const forgotPasswordButton = screen.getAllByRole("button", {
      name: /sign in /i,
    })[0];
    fireEvent.click(forgotPasswordButton);

    expect(consoleSpy).toHaveBeenCalledWith("Forgot Password");

    consoleSpy.mockRestore();
  });

  it("redirects to login page when clicking 'Already have an account?'", () => {
    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <CreateAccountPage />
        </MemoryRouter>
      </Provider>
    );

    // Query the button that triggers the sign-in action
    const signInButton = screen.getAllByRole("button", { name: /sign in/i })[0];

    // Check if the button is present
    expect(signInButton).toBeInTheDocument();

    // Simulate a click on the button
    fireEvent.click(signInButton);

    // Check if the navigate function has been called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
