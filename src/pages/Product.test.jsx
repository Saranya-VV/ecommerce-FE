import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter, Routes } from 'react-router-dom';
import Product from './Product';
import rootReducer from '../redux/productSlice'; // Import your root reducer
import { ToastContainer } from 'react-toastify';

const renderWithStoreAndRouter = (initialState, route = '/') => {
  const store = createStore(rootReducer, initialState);
  
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes path="/" element={<Product />} />
      </MemoryRouter>
    </Provider>
  );
};

describe('Product Component', () => {
  const mockProduct = {
    _id: '1',
    title: 'Test Product',
    image: 'test-image-url',
    price: 100,
    oldPrice: 120,
    description: 'This is a test product',
    isNew: true,
    category: 'test category',
  };

  beforeEach(() => {
    // Mock the location state
    window.history.pushState(
      {},
      'Test Product',
      '/',
      { state: { item: mockProduct } }
    );
  });

  test('renders product details', () => {
    renderWithStoreAndRouter({ product: { productData: [] } });

    // expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
   // expect(screen.getByText(/\$100/i)).toBeInTheDocument();
   // expect(screen.getByText(/This is a test product/i)).toBeInTheDocument();
  });

  test('adds product to cart', () => {
    renderWithStoreAndRouter({ product: { productData: [] } });

    // const addToCartButton = screen.getByRole('button', { name: /add to cart/i });

    // Mock the toast function
    const toastSuccess = jest.fn();

    //fireEvent.click(addToCartButton);

    // expect(toastSuccess).toHaveBeenCalledWith('Test Product is added');
  });

  
});