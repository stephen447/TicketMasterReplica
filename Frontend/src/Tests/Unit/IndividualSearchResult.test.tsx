import React from "react"; // Import React (may not be needed in some setups)
import { render, screen } from "@testing-library/react"; // Import testing library
import { MemoryRouter } from "react-router-dom";

import IndividualSearchResult from "../../Components/IndividualSearchResult";

test("renders the event details correctly", () => {
  render(
    <MemoryRouter>
      <IndividualSearchResult
        id={1}
        title="Sample Event"
        date="2024-02-10"
        location="Dublin"
      />
    </MemoryRouter>
  );

  expect(screen.getByText("Sample Event")).toBeInTheDocument();
  expect(screen.getByText("2024-02-10")).toBeInTheDocument();
  expect(screen.getByText("Dublin")).toBeInTheDocument();
});
