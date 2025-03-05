import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductsCard from "./ProductsCard"; // Adjust the import path as needed
import { ToastContainer, toast } from "react-toastify";

// Correctly mock `react-toastify` with partial mock
vi.mock("react-toastify", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    toast: {
      ...actual.toast,
      success: vi.fn(),
    },
  };
});

// Mock `useNavigate`
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

describe("ProductsCard Component", () => {
  const mockStore = configureStore([]);
  const store = mockStore({});

  const product = {
    _id: "1",
    title: "Test Product",
    image: "test-image-url.jpg",
    price: 100,
    oldPrice: 150,
    category: "Electronics",
    description: "Test product description",
    isNew: true,
  };

  test("renders product details correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsCard product={product} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$150")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Sale")).toBeInTheDocument();
  });

  test("dispatches addToCart action and shows toast on 'add to cart' click", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsCard product={product} />
          <ToastContainer />
        </MemoryRouter>
      </Provider>
    );

    const addToCartButton = screen.getByText(/add to cart/i);
    fireEvent.click(addToCartButton);

    // Check if the `addToCart` action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: "product/addToCart",
        payload: {
          _id: "1",
          title: "Test Product",
          image: "test-image-url.jpg",
          price: 100,
          quantity: 1,
          description: "Test product description",
        },
      })
    );

    // Check if the toast function was called
    expect(toast.success).toHaveBeenCalledWith("Test Product is added");
  });
});
