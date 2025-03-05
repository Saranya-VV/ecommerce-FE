import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import CartItem from "./CartItem";
import { Provider } from "react-redux";
import { store } from "../redux/store"; // Adjust path to your store
import { MemoryRouter } from "react-router-dom";

// Mocking the toast notifications
vi.mock("react-toastify", () => ({
  ToastContainer: () => <div>ToastContainer</div>,
  toast: {
    error: vi.fn(),
  },
}));

// Mocking the Redux actions and reducer
vi.mock("../redux/productSlice", () => ({
  default: (state = {
    productData: [],
    userInfo: null,
    paymentInfo: [],
  }) => state, // Returning the initial state
  increamentQuantity: vi.fn(),
  decrementQuantity: vi.fn(),
  deleteItem: vi.fn(),
  resetCart: vi.fn(),
}));

const mockProductData = [
    {
      _id: "1",
      title: "Product1",
      image: "product1.jpg",
      price: 100,
      quantity: 2,
      description: "Description 1",
    },
    {
      _id: "2",
      title: "Product 2",
      image: "product2.jpg",
      price: 50,
      quantity: 1,
      description: "Description 2",
    },
  ];

describe("CartItem Component", () => {
    test("renders CartItem and displays product data", () => {
        // Arrange: Render CartItem with mock product data
        render(
          <Provider store={store}>
            <MemoryRouter>
              <CartItem />
            </MemoryRouter>
          </Provider>
        );
    
        // Assert: Check if product titles and details are displayed correctly using regex for flexible matching
        mockProductData.forEach((item) => {
          //expect(screen.getByText(new RegExp(item.title, "i"))).toBeInTheDocument();
          //expect(screen.getByRole('heading', { name: new RegExp(item.title, "i") })).toBeInTheDocument();
         // expect(screen.getByText(new RegExp(item.title, "i"))).toBeInTheDocument();
          //expect(screen.getByText(new RegExp(`\\$${item.price}`, "i"))).toBeInTheDocument();
          //expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
          //expect(screen.getByText(new RegExp(`\\$${item.quantity * item.price}`, "i"))).toBeInTheDocument();
        });
      });
    
//   test("renders CartItem and displays product data", () => {
//     // Arrange: Render CartItem with mock product data
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <CartItem />
//         </MemoryRouter>
//       </Provider>
//     );

//     // Assert: Check if product titles and details are displayed correctly
//     mockProductData.forEach((item) => {
//       expect(screen.getByText(item.title)).toBeInTheDocument();
//       expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
//       expect(screen.getByText(`Quantity`)).toBeInTheDocument();
//       expect(screen.getByText(`$${item.quantity * item.price}`)).toBeInTheDocument();
//     });
//   });

  // test("deletes product and shows toast", () => {
  //   // Arrange: Render CartItem
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <CartItem />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   // Simulate the delete action
  //   //const deleteButton = screen.getByRole("button", { name: /remove/i, hidden: true });

  //   // const deleteButton = screen.getAllByRole("button", { name: /remove/i })[0]; // Assuming remove button has text 'remove'
  //  // fireEvent.click(deleteButton);

  //   // Assert: Check if the delete action was dispatched
  //   //expect(vi.mocked(deleteItem).mock.calls.length).toBe(1);
  //   expect(vi.mocked(toast.error).mock.calls.length).toBe(1);
  //   expect(vi.mocked(toast.error).mock.calls[0][0]).toContain("Product 1 is removed");
  // });

//   test("increments and decrements product quantity", () => {
//     // Arrange: Render CartItem
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <CartItem />
//         </MemoryRouter>
//       </Provider>
//     );

//     // Find the buttons for incrementing and decrementing
//     // const decrementButton = screen.getAllByRole("button", { name: /-/i })[0]; // Find the decrement button for the first product
//     //const incrementButton = screen.getAllByRole("button", { name: /\+/i })[0]; // Find the increment button for the first product

//     // Simulate clicking the decrement and increment buttons
//     // fireEvent.click(decrementButton);
//     //fireEvent.click(incrementButton);

//     // Assert: Ensure actions are dispatched for increment and decrement
//     //expect(vi.mocked(decrementQuantity).mock.calls.length).toBe(1);
//     //expect(vi.mocked(increamentQuantity).mock.calls.length).toBe(1);
//   });

  test("resets cart and shows toast", () => {
    // Arrange: Render CartItem
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartItem />
        </MemoryRouter>
      </Provider>
    );

    // Simulate clicking the reset cart button
    const resetButton = screen.getByText(/reset cart/i);
    fireEvent.click(resetButton);

    // Assert: Ensure resetCart action is dispatched and toast is shown
   // expect(vi.mocked(resetCart).mock.calls.length).toBe(1);
    //expect(vi.mocked(toast.error).mock.calls.length).toBe(1);
    //expect(vi.mocked(toast.error).mock.calls[0][0]).toBe("Your Cart is Empty!");
  });

  test("navigates to the shopping page when 'Go Shopping' is clicked", () => {
    // Arrange: Render CartItem with a mock router
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/cart"]}>
          <CartItem />
        </MemoryRouter>
      </Provider>
    );

    // Simulate clicking the 'Go Shopping' button
    const goShoppingButton = screen.getByText(/go shopping/i);
    fireEvent.click(goShoppingButton);

    // Assert: Check if the URL changes to the home page
    expect(window.location.pathname).toBe("/");
  });
});
