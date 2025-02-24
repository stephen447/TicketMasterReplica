import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { userStore } from "../../Store/UserStore";
import Header from "../../Components/Header";
import { BrowserRouter } from "react-router-dom";

// Mock the userStore
jest.mock("../../Store/UserStore", () => ({
  userStore: {
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
    },
    setUserData: jest.fn(),
    clearUserData: jest.fn(),
    get fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
}));

describe("Header Component", () => {
  beforeEach(() => {
    // Reset userStore before each test
    userStore.user = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
    };
  });

  it("renders the logo", () => {
    render(
      <BrowserRouter>
        <Header userStore={userStore} />
      </BrowserRouter>
    );
    expect(screen.getByText("Eventure")).toBeInTheDocument();
  });

  it("renders navigation links when window width is greater than 768px", () => {
    window.innerWidth = 1024;
    render(
      <BrowserRouter>
        <Header userStore={userStore} />
      </BrowserRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Concerts")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
    expect(screen.getByText("Theater")).toBeInTheDocument();
  });

  it("hides navigation links when window width is less than 768px", () => {
    window.innerWidth = 500;
    render(
      <BrowserRouter>
        <Header userStore={userStore} />
      </BrowserRouter>
    );
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Concerts")).not.toBeInTheDocument();
    expect(screen.queryByText("Sports")).not.toBeInTheDocument();
    expect(screen.queryByText("Theater")).not.toBeInTheDocument();
  });

  it("displays 'Sign In' button if user is not signed in", () => {
    render(
      <BrowserRouter>
        <Header userStore={userStore} />
      </BrowserRouter>
    );
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("displays user's full name if user is signed in", () => {
    // Simulate a signed-in user
    userStore.user = {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    };

    render(
      <BrowserRouter>
        <Header userStore={userStore} />
      </BrowserRouter>
    );

    // Check that the full name is displayed
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("has appropriate aria-labels for navigation links", () => {
    render(
      <BrowserRouter>
        <Header userStore={userStore} />
      </BrowserRouter>
    );
    const links = screen.getAllByRole("button");
    links.forEach((link) => {
      expect(link).toHaveAccessibleName();
    });
  });

  // it("has no accessibility violations", async () => {
  //   const { container } = render(
  //     <BrowserRouter>
  //       <Header userStore={userStore} />
  //     </BrowserRouter>
  //   );

  //   const results = await axe(container);
  //   toHaveNoViolations(results);
  // });
});
