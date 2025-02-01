import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Homepage from "../../Pages/Homepage";

jest.mock("../../Components/Header", () => () => <div>Mock Header</div>);
jest.mock("../../Components/Footer", () => () => <div>Mock Footer</div>);
jest.mock("../../Components/Carousel", () => () => <div>Mock Carousel</div>);

jest.mock("../../SampleData/Events.json", () => [
  { id: 1, title: "Music Festival", description: "A great music event" },
  { id: 2, title: "Tech Conference", description: "Innovative tech talks" },
  { id: 3, title: "Art Exhibition", description: "Showcasing local artists" },
]);

// Mock navigate function from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Homepage", () => {
  test("renders the header, footer, and search input", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search events, artists, venues")
    ).toBeInTheDocument();
  });

  test("allows the user to enter a search term", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(
      "Search events, artists, venues"
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "Concert" } });
    expect(searchInput.value).toBe("Concert");
  });

  test("displays an error when start date is after end date", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    const startDateInput = screen.getByLabelText("Start Date");
    const endDateInput = screen.getByLabelText("End Date");

    fireEvent.change(startDateInput, { target: { value: "2025-12-10" } });
    fireEvent.change(endDateInput, { target: { value: "2025-12-01" } });

    expect(
      screen.getByText("Start date must be before end date")
    ).toBeInTheDocument();
  });

  test("disables the search button when there is an error", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    const startDateInput = screen.getByLabelText("Start Date");
    const endDateInput = screen.getByLabelText("End Date");
    const searchButton = screen.getByText("Search");

    fireEvent.change(startDateInput, { target: { value: "2025-12-10" } });
    fireEvent.change(endDateInput, { target: { value: "2025-12-01" } });

    expect(searchButton).toBeDisabled();
  });

  test("allow the user to select a region", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    // Get the region dropdown
    const regionSelect = screen.getByRole("combobox");
    expect(regionSelect).toBeInTheDocument();

    // Select a region
    fireEvent.change(regionSelect, { target: { value: "Europe" } });
    expect(regionSelect).toHaveValue("Europe");
  });

  test("renders the Popular Events section with event titles", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    // Ensure the section header is present
    expect(
      screen.getByRole("heading", { name: /popular tickets/i })
    ).toBeInTheDocument();

    // Check if the mocked event titles appear in the UI
    expect(screen.getByText("Music Festival")).toBeInTheDocument();
    expect(screen.getByText("Tech Conference")).toBeInTheDocument();
    expect(screen.getByText("Art Exhibition")).toBeInTheDocument();
  });

  test("renders 'Find Tickets' buttons for each event", () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button", { name: /find tickets/i });

    // Expect one button per event
    expect(buttons).toHaveLength(3);
  });
});
