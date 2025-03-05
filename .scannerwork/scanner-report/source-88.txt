import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  test('renders the 404 error message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    // Check for the presence of the 404 error code
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('displays the "Page not found" heading', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    // Check for the heading with "Page not found" text
    expect(screen.getByRole('heading', { name: /Page not found/i })).toBeInTheDocument();
  });

  test('displays a message explaining the error', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    // Check for the paragraph with the message
    expect(screen.getByText(/Sorry, we couldn’t find the page you’re looking for./i)).toBeInTheDocument();
  });

  test('has a link to go back home', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    // Check for the "Go back home" link
    const homeLink = screen.getByRole('link', { name: /Go back home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('has a link to contact support', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    // Check for the "Contact support" link
    const supportLink = screen.getByRole('link', { name: /Contact support/i });
    expect(supportLink).toBeInTheDocument();
    expect(supportLink).toHaveAttribute('href', '/contact-support'); 
  });
});
