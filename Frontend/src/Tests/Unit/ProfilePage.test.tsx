import { render, screen, fireEvent } from "@testing-library/react";
import ProfilePage from "../../Pages/ProfilePage";
import { MemoryRouter } from "react-router-dom";

describe("ProfilePage Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the ProfilePage component correctly", () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    // Check if header exists
    expect(screen.getByText("My Account")).toBeInTheDocument();

    // Check if tabs are rendered
    expect(screen.getByText("My Tickets")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();

    // Default tab is "My Tickets"
    expect(screen.getByText("Your Tickets")).toBeInTheDocument();
  });

  it("switches tabs when clicked", () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    // Click on "Profile" tab
    fireEvent.click(screen.getByText("Profile"));
    expect(screen.getByText("Profile Information")).toBeInTheDocument();

    // Click on "Sign Out" tab
    fireEvent.click(screen.getByText("Sign Out"));
    const signOutButtons = screen.getAllByText("Sign Out");
    expect(signOutButtons.length).toBe(3); // Ensure there are 3 "Sign Out" buttons
  });

  it("loads user data from localStorage", () => {
    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        countryOfResidence: "Ireland",
      })
    );

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Profile")); // Switch to Profile tab

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ireland")).toBeInTheDocument();
  });

  it("updates form fields and marks changes as unsaved", () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Profile")); // Switch to Profile tab

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "Alice" } });
    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "Smith" } });
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    const countryInput = screen.getByLabelText("Country");
    fireEvent.change(countryInput, { target: { value: "Ireland" } });

    expect(firstNameInput).toHaveValue("Alice");
    expect(lastNameInput).toHaveValue("Smith");
    expect(emailInput).toHaveValue("test@gmail.com");
    expect(countryInput).toHaveValue("Ireland");
    expect(screen.getByText("Save Changes")).toBeInTheDocument(); // Button appears when changes are made
  });

  it("saves user data to localStorage", () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Profile")); // Switch to Profile tab

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "Alice" } });

    fireEvent.click(screen.getByText("Save Changes"));

    expect(localStorage.getItem("userProfile")).toContain("Alice");
    expect(screen.getByText("Changes saved successfully!")).toBeInTheDocument();
  });

  it("shows sign out button and allows sign out", () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Sign Out")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Sign Out")); // Switch to Sign Out tab

    const signOutButtons = screen.getAllByText("Sign Out");

    fireEvent.click(signOutButtons[2]); // Click the second "Sign Out" button
    expect(signOutButtons.length).toBe(3); // Ensure there are 3 "Sign Out" buttons
  });
});
