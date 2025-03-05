import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

test('renders the login form', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  // Check for the presence of a heading and form elements
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument(); // Checks for a heading element
  expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument(); // Checks for a button element with text "Login"
});

// test('displays error message on failed login', async () => {
//   render(
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>
//   );

//   // Simulate user input
//   fireEvent.change(screen.getByPlaceholderText(/enter your username/i), { target: { value: 'wrongUser' } });
//   fireEvent.change(screen.getByPlaceholderText(/enter your password/i), { target: { value: 'wrongPass' } });
  
//   // Click the button to submit the form
//   fireEvent.click(screen.getByRole('button', { name: /login/i }));

//   // Assert that the error message appears (assuming "Invalid Login" will be shown)
//   expect(await screen.findByText(/invalid login/i)).toBeInTheDocument();
// });
