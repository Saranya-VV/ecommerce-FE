import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./Footer";

// Mock the image imports
vi.mock("../assets", () => ({
  logoLight: "logo-light-mock.png",
  paymentLogo: "payment-logo-mock.png",
}));

describe("Footer Component", () => {
  it("should render the Footer component with essential elements", () => {
    render(<Footer />);

    // Check for the logo images
    const logoImage = screen.getByAltText("logoLight");
    const paymentImage = screen.getByAltText("paymentLogo");
    expect(logoImage).toBeInTheDocument();
    expect(paymentImage).toBeInTheDocument();

    // Check for locate section title and contents
    expect(screen.getByRole("heading", { name: /locate us/i })).toBeInTheDocument();
    expect(screen.getByText("13th Street, New York")).toBeInTheDocument();
    expect(screen.getByText(/mobile: \+100 12356758/i)).toBeInTheDocument();
    expect(screen.getByText(/phone: \+100 20155566/i)).toBeInTheDocument();
    expect(screen.getByText(/e-mail: online@gmail.com/i)).toBeInTheDocument();

    // Check for profile section title and options
    expect(screen.getByRole("heading", { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByText(/my account/i)).toBeInTheDocument();
    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/order tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/help & support/i)).toBeInTheDocument();

    // Check for the social media links
    const socialLinks = screen.getAllByRole("button"); // Buttons based on the span class 'cursor-pointer'
    expect(socialLinks).toHaveLength(1); // Assuming 5 social links in the array

    // Check for the subscription input field and button
    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const subscribeButton = screen.getByText(/subscribe/i);
    expect(emailInput).toBeInTheDocument();
    expect(subscribeButton).toBeInTheDocument();
  });
});
