import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import Header from "../../Components/Header";

describe("Header Component", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it("renders the logo", () => {
    render(<Header />);
    expect(screen.getByText("Eventure")).toBeInTheDocument();
  });

  it("renders navigation links when window width is greater than 768px", () => {
    window.innerWidth = 1024;
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Concerts")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
    expect(screen.getByText("Theater")).toBeInTheDocument();
  });

  it("hides navigation links when window width is less than 768px", () => {
    window.innerWidth = 500;
    render(<Header />);
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Concerts")).not.toBeInTheDocument();
    expect(screen.queryByText("Sports")).not.toBeInTheDocument();
    expect(screen.queryByText("Theater")).not.toBeInTheDocument();
  });

  it("displays 'Sign In' button if user is not signed in", () => {
    render(<Header />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("displays 'Sign Out' button if user is signed in", () => {
    localStorage.setItem("user", JSON.stringify({ username: "testuser" }));
    render(<Header />);
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("removes user from localStorage and reloads page on 'Sign Out'", () => {
    localStorage.setItem("user", JSON.stringify({ username: "testuser" }));
    render(<Header />);
    const signOutButton = screen.getByText("Sign Out");

    // Mock window.location.reload
    const reloadMock = jest.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadMock },
      writable: true,
    });

    fireEvent.click(signOutButton);

    expect(localStorage.getItem("user")).toBeNull();
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });

  it("has appropriate aria-labels for navigation links", () => {
    render(<Header />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAccessibleName();
    });
  });

  expect.extend(toHaveNoViolations);

  it("has no accessibility violations", async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
