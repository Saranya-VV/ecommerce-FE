import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Banner from "./Banner";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

// Mock the react-icons components (if needed)
vi.mock("react-icons/hi", () => ({
  HiArrowRight: () => <div data-testid="arrow-right">Right</div>,
  HiArrowLeft: () => <div data-testid="arrow-left">Left</div>,
}));

describe("Banner Component", () => {
  it("should render Banner component with images", () => {
    render(<Banner />);

    // Check if the images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4); // Expecting 4 images

    // Check if the navigation arrows are rendered
    const leftArrow = screen.getByTestId("arrow-left");
    const rightArrow = screen.getByTestId("arrow-right");
    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).toBeInTheDocument();
  });

  it("should navigate to the next and previous slides on arrow click", () => {
    render(<Banner />);

    // Get the initial images
    const images = screen.getAllByRole("img");

    // Get the navigation buttons
    const leftArrow = screen.getByTestId("arrow-left");
    const rightArrow = screen.getByTestId("arrow-right");

    // Check initial slide
    expect(images[0]).toBeVisible(); // First image should be visible

    // Click the right arrow to go to the next slide
    fireEvent.click(rightArrow);

    // After clicking, check if the second image is visible
    expect(images[1]).toBeVisible();

    // Click the right arrow again to go to the third slide
    fireEvent.click(rightArrow);
    expect(images[2]).toBeVisible();

    // Click the left arrow to go back to the second slide
    fireEvent.click(leftArrow);
    expect(images[1]).toBeVisible();
  });
});
