import "@testing-library/jest-dom";
// import "@testing-library/jest-dom/extend-expect";
global.jest = require("jest-mock"); // This should be unnecessary in most cases

// Set environment variables required for the test environment
process.env.VITE_API_BASE_URL = "https://jsonplaceholder.typicode.com";

if (typeof window.matchMedia !== "function") {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
