import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Carousel from "../../Components/Carousel";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

const mockItems = [
  { title: "Slide 1", description: "Description 1" },
  { title: "Slide 2", description: "Description 2" },
  { title: "Slide 3", description: "Description 3" },
];

jest.useFakeTimers(); // Mock setInterval for testing

describe("Carousel", () => {
  it("renders slides correctly", () => {
    render(
      <BrowserRouter>
        <Carousel items={mockItems} />
      </BrowserRouter>
    );

    // Check if the first slide is rendered with correct content
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });

  it("should automatically cycle slides", async () => {
    render(
      <BrowserRouter>
        <Carousel items={mockItems} />
      </BrowserRouter>
    );

    // Initially, the first slide should be visible
    expect(screen.getByText("Slide 1")).toBeInTheDocument();

    // Wait for the interval and check if the second slide is visible
    jest.advanceTimersByTime(1000); // Advance time by 1 second
    await waitFor(() =>
      expect(screen.getByText("Slide 2")).toBeInTheDocument()
    );

    // Advance the time again and check for the third slide
    jest.advanceTimersByTime(1000);
    await waitFor(() =>
      expect(screen.getByText("Slide 3")).toBeInTheDocument()
    );

    // Cycle back to the first slide
    jest.advanceTimersByTime(1000);
    await waitFor(() =>
      expect(screen.getByText("Slide 1")).toBeInTheDocument()
    );
  });

  it("changes to the correct slide when a dot is clicked", () => {
    render(
      <BrowserRouter>
        <Carousel items={mockItems} />
      </BrowserRouter>
    );

    // Click on the second dot to navigate to the second slide
    const secondDot = screen.getAllByRole("button")[1];
    fireEvent.click(secondDot);

    // Check if the second slide is now visible
    expect(screen.getByText("Slide 2")).toBeInTheDocument();

    // Click on the third dot to navigate to the third slide
    const thirdDot = screen.getAllByRole("button")[2];
    fireEvent.click(thirdDot);

    // Check if the third slide is now visible
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  it("renders with the default interval of 3000ms", () => {
    render(
      <BrowserRouter>
        <Carousel items={mockItems} />
      </BrowserRouter>
    );

    // Check if the first slide is initially displayed
    expect(screen.getByText("Slide 1")).toBeInTheDocument();

    // Wait for the interval to pass and check if the slide changes
    jest.advanceTimersByTime(3000);
    waitFor(() => expect(screen.getByText("Slide 2")).toBeInTheDocument());
  });
});
