import React from "react"; // Import React (may not be needed in some setups)
import { render, screen } from "@testing-library/react"; // Import testing library
import IndividualSearchResult from "../../Components/IndividualSearchResult";

describe("IndividualSearchResult Component", () => {
  it("renders the event details correctly", () => {
    render(
      <IndividualSearchResult
        title="Concert"
        date={"20240315"} // Use the correct prop type for `date`
        location="New York"
        availability="Available"
      />
    );
    expect(screen.getByText("Concert")).toBeInTheDocument();
    expect(screen.getByText("20240315")).toBeInTheDocument(); // Match how the date is displayed
    expect(screen.getByText("New York")).toBeInTheDocument();
  });
});
