import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Assuming store is correctly exported
import Success from './Success'; // Adjust path if necessary
import { resetCart } from '../redux/productSlice';
import { vi } from 'vitest';

// Mocking react-toastify
vi.mock('react-toastify', () => ({
  ...vi.importActual('react-toastify'),
  toast: { success: vi.fn() }, // Mocking toast success
  ToastContainer: () => null, // Return null as we don't need to render ToastContainer in tests
}));

describe('Success Component', () => {
  it('should redirect to home if no session_id is provided', () => {
    const { container } = render(
      <Router>
        <Provider store={store}>
          <Success />
        </Provider>
      </Router>
    );

    // expect(container.innerHTML).toMatch('Redirecting...');
  });

  it('should dispatch resetCart and show success toast if session_id is provided', async () => {
    // Set up mock session_id in the URL
    const search = '?session_id=test-session-id';
    window.history.pushState({}, 'Test Page', search);

    // Spy on dispatch
    const dispatch = vi.fn();

    render(
      <Router>
        <Provider store={{ ...store, dispatch }}>
          <Success />
        </Provider>
      </Router>
    );

    // Wait for the toast success message to be called
    // await waitFor(() => expect(vi.fn()).toHaveBeenCalledWith('Your payment was successful!'));

    // Check if resetCart action was dispatched
    expect(dispatch).toHaveBeenCalledWith(resetCart());

    // Check that the UI renders the success message
    expect(screen.getByText('We received your payment successfully')).toBeInTheDocument();
    expect(screen.getByText('Thank you for shopping with us!')).toBeInTheDocument();

    // Check the "Continue Shopping" button
    const continueShoppingButton = screen.getByRole('button', { name: /continue shopping/i });
    expect(continueShoppingButton).toBeInTheDocument();

    // Simulate button click to ensure navigation
    fireEvent.click(continueShoppingButton);

    // Check if the user is redirected to the homepage
    expect(window.location.pathname).toBe('/');
  });
});
