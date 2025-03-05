import { describe, test, expect, vi } from "vitest";
import axios from "axios";
import { getProducts } from "./index"; // Adjust the path as needed

// Mock the axios module
vi.mock("axios");

describe("getProducts", () => {
  test("fetches products successfully", async () => {
    // Mock data for axios response
    const mockProducts = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
    ];
    axios.get.mockResolvedValue({ data: mockProducts });

    // Call the function
    const products = await getProducts();

    // Assertions
    expect(axios.get).toHaveBeenCalledWith("https://fakestoreapiserver.reactbd.com/products");
    expect(products.data).toEqual(mockProducts);
  });

  test("handles an error when fetching products", async () => {
    // Mock an error response from axios
    axios.get.mockRejectedValue(new Error("Network Error"));

    // Call the function and catch the error
    try {
      await getProducts();
    } catch (error) {
      // Assertions
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Network Error");
    }
  });
});
