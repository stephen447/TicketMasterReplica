import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage";
import { userStore } from "../../Store/UserStore";
import axiosInstance from "../../axiosInstance";
import { Provider } from "mobx-react";

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

describe("LoginPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form correctly", () => {
    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // Check if email and password fields exist
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check if buttons exist
    expect(
      screen.getAllByRole("button", { name: /sign in/i })[0]
    ).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  it("allows user to type into input fields", () => {
    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Type into inputs
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Check if values are updated
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("handles sign-in success", async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValue({
      data: {
        user: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
        },
      },
    });

    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getAllByRole("button", { name: /sign in/i })[1];

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(userStore.user.email).toBe("test@example.com");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("handles sign-in failure", async () => {
    (axiosInstance.post as jest.Mock).mockRejectedValue(
      new Error("Invalid credentials")
    );

    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getAllByRole("button", { name: /sign in/i })[0];

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(
        screen.getByText("Invalid username or password")
      ).toBeInTheDocument();
    });
  });

  it("triggers Forgot Password function on button click", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const forgotPasswordButton = screen.getByText(/forgot password/i);
    fireEvent.click(forgotPasswordButton);

    expect(consoleSpy).toHaveBeenCalledWith("Forgot Password");

    consoleSpy.mockRestore();
  });

  it("redirects to create account page when clicking 'Create one'", () => {
    render(
      <Provider userStore={userStore}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const createAccountLink = screen.getByRole("link", { name: /create one/i });

    expect(createAccountLink).toBeInTheDocument();
    expect(createAccountLink).toHaveAttribute("href", "/create-account");
  });
});
