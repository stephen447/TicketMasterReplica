import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../../Pages/LoginPage";

describe("LoginPage Component", () => {
  it("renders login form correctly", () => {
    render(<LoginPage />);

    // Check if username and password fields exist
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    // Check if buttons exist
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /forgot password/i })
    ).toBeInTheDocument();
  });

  it("allows user to type into input fields", async () => {
    render(<LoginPage />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    // Type into inputs
    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(passwordInput, "mypassword");

    // Check if values are updated
    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("mypassword");
  });

  it("triggers Sign In function on button click", async () => {
    render(<LoginPage />);

    const signInButton = screen.getByRole("button", { name: /sign in/i });

    // Mock console.log for verification
    const consoleSpy = jest.spyOn(console, "log");

    // Click sign in
    await userEvent.click(signInButton);

    // Ensure function was called
    expect(consoleSpy).toHaveBeenCalledWith("Sign In");

    consoleSpy.mockRestore();
  });

  it("triggers Forgot Password function on button click", async () => {
    render(<LoginPage />);

    const forgotPasswordButton = screen.getByRole("button", {
      name: /forgot password/i,
    });

    // Mock console.log for verification
    const consoleSpy = jest.spyOn(console, "log");

    // Click forgot password
    await userEvent.click(forgotPasswordButton);

    // Ensure function was called
    expect(consoleSpy).toHaveBeenCalledWith("Forgot Password");

    consoleSpy.mockRestore();
  });

  it("redirects to create account page when clicking 'Create one'", async () => {
    render(<LoginPage />);

    const createAccountLink = screen.getByRole("link", { name: /create one/i });

    // Ensure the link exists
    expect(createAccountLink).toBeInTheDocument();
    expect(createAccountLink).toHaveAttribute("href", "/create-account");
  });
});
