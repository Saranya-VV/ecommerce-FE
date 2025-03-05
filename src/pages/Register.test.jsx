import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register'; // Make sure this is the correct path to your component
import '@testing-library/jest-dom';

// If you want to mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    // If you have any other methods to mock, you can add them here
  };
});

describe('Register Component', () => {
  it('should render all input fields and submit button', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Your assertions here, for example:
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  it('should successfully submit the form with valid data', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Example actions and assertions
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Add assertions for successful submission, such as:
    // expect(screen.getByText(/Registration Successful/i)).toBeInTheDocument();
  });

  it('should show error alert on registration failure', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Simulate a registration failure scenario
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Add assertions for failure alert:
    // expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
  });
});
