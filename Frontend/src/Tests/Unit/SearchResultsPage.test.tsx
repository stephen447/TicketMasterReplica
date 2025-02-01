import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchResultsPage from "../../Pages/SearchResultsPage";
import Events from "../../SampleData/Events.json";
import { MemoryRouter } from "react-router-dom";

// Mock URLSearchParams
beforeAll(() => {
  Object.defineProperty(window, "location", {
    value: {
      search:
        "?startDate=2024-01-01&endDate=2024-12-31&region=Europe&searchTerm=music",
    },
    writable: true,
  });
});

describe("SearchResultsPage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SearchResultsPage />
      </MemoryRouter>
    );
  });

  test("renders search results page correctly", async () => {
    expect(screen.getByText("Search Results")).toBeInTheDocument();
  });

  test("displays initial results correctly", async () => {
    await waitFor(() => {
      expect(
        screen.getByText(`Displaying 3 of ${Events.length} Results`)
      ).toBeInTheDocument();
    });

    // Check that the first three events are rendered
    for (let i = 0; i < 3; i++) {
      expect(screen.getByText(Events[i].title)).toBeInTheDocument();
      expect(screen.getByText(Events[i].date)).toBeInTheDocument();
      expect(screen.getByText(Events[i].city)).toBeInTheDocument();
    }
  });

  //   test("displays 'No results found' message if there are no events", async () => {
  //     // Mock the JSON import to return an empty array
  //     jest.mock("../../SampleData/Events.json", () => []);

  //     // Mock the fetch API if you're still using it for other purposes
  //     jest.spyOn(globalThis, "fetch").mockResolvedValue({
  //       json: async () => [],
  //     } as Response);

  //     render(
  //       <MemoryRouter>
  //         <SearchResultsPage />
  //       </MemoryRouter>
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByText(/^No results found\.$/)).toBeInTheDocument();
  //     });
  //   });

  test("shows 'More Results' button if more events are available", async () => {
    await waitFor(() => {
      expect(screen.getByText("More Results")).toBeInTheDocument();
    });
  });

  test("loads more results when 'More Results' button is clicked", async () => {
    await waitFor(() => {
      expect(screen.getByText("More Results")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("More Results"));

    await waitFor(() => {
      expect(screen.getByText(`Displaying 5 of 5 Results`)).toBeInTheDocument();
    });

    // Ensure new events are added
    for (let i = 3; i < 5; i++) {
      expect(screen.getByText(Events[i].title)).toBeInTheDocument();
    }
  });

  test("hides 'More Results' button when all events are loaded", async () => {
    for (let i = 0; i < Math.ceil(Events.length / 3); i++) {
      const moreResultsButton = screen.queryByText("More Results");
      if (moreResultsButton) {
        fireEvent.click(moreResultsButton);
      }
    }

    await waitFor(() => {
      expect(screen.queryByText("More Results")).not.toBeInTheDocument();
    });
  });
});
