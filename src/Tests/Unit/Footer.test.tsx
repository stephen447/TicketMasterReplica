import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Footer from "../../Components/Footer";

expect.extend(toHaveNoViolations);

describe("Footer Component", () => {
  // Smoke test
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByText(/Follow Me/i)).toBeInTheDocument();
  });

  // Rendering tests
  it("renders social media links correctly", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /github/i });
    const linkedInLink = screen.getByRole("link", { name: /linkedin/i });
    const websiteLink = screen.getByRole("link", { name: /website/i }); // Match the new label

    expect(githubLink).toHaveAttribute("href", "https://github.com/stephen447");
    expect(linkedInLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/stephen-byrne-b4729321b/"
    );
    expect(websiteLink).toHaveAttribute(
      "href",
      "https://stephenbyrne.onrender.com/"
    );
  });

  it("renders navigation links correctly", () => {
    render(<Footer />);
    const links = [
      { text: "About Us", href: "/about" },
      { text: "Support", href: "/support" },
      { text: "Careers", href: "/careers" },
      { text: "Terms of Service", href: "/terms" },
      { text: "Privacy Policy", href: "/privacy" },
    ];

    links.forEach(({ text, href }) => {
      const link = screen.getByRole("link", { name: text });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("renders the newsletter subscription form", () => {
    render(<Footer />);
    expect(
      screen.getByPlaceholderText(/Enter your email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /subscribe/i })
    ).toBeInTheDocument();
  });

  it("renders the bottom section links", () => {
    render(<Footer />);
    const bottomLinks = [
      { text: "Terms", href: "/terms" },
      { text: "Privacy", href: "/privacy" },
      { text: "Cookies", href: "/cookies" },
    ];

    bottomLinks.forEach(({ text, href }) => {
      const link = screen.getByRole("link", { name: text });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  // Interaction tests
  it("allows users to type in the newsletter subscription field", () => {
    render(<Footer />);
    const input = screen.getByPlaceholderText(
      /Enter your email/i
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input.value).toBe("test@example.com");
  });

  // Accessibility test
  it("is accessible according to axe", async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Snapshot test
  //   it("matches the snapshot", () => {
  //     const { container } = render(<Footer />);
  //     expect(container).toMatchSnapshot();
  //   });
});
