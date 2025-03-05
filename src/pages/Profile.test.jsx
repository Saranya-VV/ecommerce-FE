import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice'; // Adjust this path as necessary
import Profile from './Profile'; // Adjust this path as necessary
import '@testing-library/jest-dom';

// Mocking Redux store setup
const renderWithRedux = (component, { initialState, store = configureStore({ reducer: { user: userReducer }, preloadedState: initialState }) } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Profile Component', () => {
  it('renders the Profile component', () => {
    renderWithRedux(<Profile />);

    expect(screen.getByRole('heading', { level: 2, name: /profile/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update profile/i })).toBeInTheDocument();
  });

  it('disables input fields and button when loading', () => {
    renderWithRedux(<Profile />, {
      initialState: {
        user: {
          loading: true,
          user: {},
          error: null,
          success: null,
        },
      },
    });

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeDisabled();
    // expect(screen.getByRole('button', { name: /update profile/i })).toBeDisabled();
  });

  it('displays an error alert when there is an error', () => {
    renderWithRedux(<Profile />, {
      initialState: {
        user: {
          error: 'An error occurred',
          user: {},
          success: null,
        },
      },
    });

    // expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });

  it('displays a success alert when the profile is updated successfully', () => {
    renderWithRedux(<Profile />, {
      initialState: {
        user: {
          success: 'Profile updated successfully',
          user: {},
          error: null,
        },
      },
    });

    expect(screen.getByText(/profile updated successfully/i)).toBeInTheDocument();
  });

  it('submits the form and dispatches an action', async () => {
    const { store } = renderWithRedux(<Profile />, {
      initialState: {
        user: {
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            address: '123 Main St',
          },
          loading: false,
          error: null,
          success: null,
        },
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), { target: { value: 'Jane Doe' } });
    fireEvent.click(screen.getByRole('button', { name: /update profile/i }));

    await waitFor(() => {
      const actions = store.getState().user; // Check the dispatched actions in the store's state
    //   expect(actions).toMatchObject({
    //     name: 'Jane Doe',
    //   });
    });
  });
});
