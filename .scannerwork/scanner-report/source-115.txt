import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Products from "./Products";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store"; // Adjust the import path to your store

// Mock data for testing
const mockProducts = [
  {
    _id: "1",
    title: "Product 1",
    image: "product1.jpg",
    price: 100,
    oldPrice: 120,
    category: "Electronics",
    description: "Description of product 1",
    isNew: true,
  },
  {
    _id: "2",
    title: "Product 2",
    image: "product2.jpg",
    price: 80,
    oldPrice: 90,
    category: "Clothing",
    description: "Description of product 2",
    isNew: false,
  },
  // Add more mock products as needed
];

describe("Products Component", () => {
  test("renders the heading and description", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products products={mockProducts} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/shopping everyday/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, quos fugit inventore, cumque quae corporis ratione tenetur eos voluptates neque magnam soluta aperiam omnis perspiciatis reiciendis asperiores repudiandae assumenda quidem./i
      )
    ).toBeInTheDocument();
  });

  test("renders the correct number of products", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products products={mockProducts} />
        </MemoryRouter>
      </Provider>
    );

    const productElements = screen.getAllByRole("heading", {
      level: 2,
    });

    expect(productElements.length).toBe(mockProducts.length);
  });

  test("renders product details correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products products={mockProducts} />
        </MemoryRouter>
      </Provider>
    );

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });
});
