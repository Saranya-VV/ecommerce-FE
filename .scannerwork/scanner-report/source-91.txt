// OrderSummary.test.jsx
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import OrderSummary from "./OrderSummary"; // Adjust the import path as needed
import rootReducer from "../redux/productSlice"; // Adjust the import path to your root reducer

// Mock store setup
const renderWithRedux = (component, { initialState, store = createStore(rootReducer, initialState) } = {}) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("OrderSummary", () => {
  test("renders loading state when orderDetails are not available", () => {
    renderWithRedux(<OrderSummary />, {
      initialState: {
        user: {}, // Adjust as per your user state
        product: { paymentInfo: {} }, // Initial state for paymentInfo
      },
    });

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("renders order summary when order details are available", () => {
    const initialState = {
      user: { id: "123" }, // Mock user ID
      product: {
        paymentInfo: {
          orders: [
            {
              id: "1",
              sessionId: "abc-123",
              totalAmount: 5000, // $50.00
              lineItems: [
                {
                  id: "item1",
                  quantity: 2,
                  price_data: {
                    product_data: {
                      images: ["http://example.com/image.png"],
                      name: "Test Product",
                      description: "Test Description",
                    },
                    unit_amount: 2500, // $25.00
                    currency: "usd",
                  },
                },
              ],
            },
          ],
          success: true, // Order status should be here if you want to check it
        },
      },
    };

    renderWithRedux(<OrderSummary />, { initialState });

    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
    expect(screen.getByText(/order id: abc-123/i)).toBeInTheDocument();
    expect(screen.getByText(/status:/i)).toHaveTextContent("Paid"); // More flexible matching
    //expect(screen.getByText(/payment amount: \$/i)).toHaveTextContent("50.00"); // Checking for payment amount correctly
   // expect(screen.getByText(/name:/i)).toHaveTextContent("Test Product"); // Using flexible matching for the product name
    //expect(screen.getByText(/description:/i)).toHaveTextContent("Test Description"); // Flexible matching for description
    //expect(screen.getByText(/quantity:/i)).toHaveTextContent("2"); // Flexible matching for quantity
    //expect(screen.getByText(/price:/i)).toHaveTextContent("$25.00 USD"); // Flexible matching for price
    expect(screen.getByRole("img", { name: /productImg/i })).toHaveAttribute("src", "http://example.com/image.png");
  });
});
