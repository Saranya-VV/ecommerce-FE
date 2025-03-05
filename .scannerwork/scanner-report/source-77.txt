import { describe, test, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Adjust the import path as needed

describe("PrivateRoute Component", () => {
  test("renders the given element when authenticated", () => {
    // Mock localStorage to return an access token
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      return key === "accessToken" ? "valid-token" : null;
    });

    const { getByText } = render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={<PrivateRoute element={<div>Private Content</div>} />}
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText("Private Content")).toBeInTheDocument();

    // Restore the original localStorage implementation
    vi.restoreAllMocks();
  });

  test("redirects to login when not authenticated", () => {
    // Mock localStorage to return null (no access token)
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => null);

    const { getByText } = render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={<PrivateRoute element={<div>Private Content</div>} />}
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText("Login Page")).toBeInTheDocument();

    // Restore the original localStorage implementation
    vi.restoreAllMocks();
  });
});
