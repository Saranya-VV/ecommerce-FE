import { describe, it, expect } from 'vitest';
import productReducer, {
  addToCart,
  deleteItem,
  resetCart,
  increamentQuantity,
  decrementQuantity,
  storePaymentResponse
} from './productSlice';

describe('productSlice reducer', () => {
  const initialState = {
    productData: [],
    userInfo: null,
    paymentInfo: [],
  };

  it('should return the initial state', () => {
    const result = productReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle addToCart action', () => {
    const item = { _id: '1', name: 'Product 1', quantity: 1 };
    const action = addToCart(item);
    const result = productReducer(initialState, action);

    expect(result.productData).toEqual([item]);

    // Adding the same item again should increase the quantity
    const updatedItem = { _id: '1', name: 'Product 1', quantity: 2 };
    const updatedResult = productReducer(result, addToCart(item));
    expect(updatedResult.productData[0].quantity).toEqual(2);
  });

  it('should handle increamentQuantity action', () => {
    const initialStateWithProduct = {
      ...initialState,
      productData: [{ _id: '1', name: 'Product 1', quantity: 1 }],
    };
    const action = increamentQuantity({ _id: '1' });
    const result = productReducer(initialStateWithProduct, action);
    expect(result.productData[0].quantity).toBe(2);
  });

  it('should handle decrementQuantity action', () => {
    const initialStateWithProduct = {
      ...initialState,
      productData: [{ _id: '1', name: 'Product 1', quantity: 2 }],
    };
    const action = decrementQuantity({ _id: '1' });
    const result = productReducer(initialStateWithProduct, action);
    expect(result.productData[0].quantity).toBe(1);

    // If quantity is 1, it should not go below 1
    const finalResult = productReducer(result, decrementQuantity({ _id: '1' }));
    expect(finalResult.productData[0].quantity).toBe(1);
  });

  it('should handle deleteItem action', () => {
    const initialStateWithProduct = {
      ...initialState,
      productData: [{ _id: '1', name: 'Product 1', quantity: 2 }],
    };
    const action = deleteItem('1');
    const result = productReducer(initialStateWithProduct, action);
    expect(result.productData).toEqual([]);
  });

  it('should handle resetCart action', () => {
    const initialStateWithProduct = {
      ...initialState,
      productData: [
        { _id: '1', name: 'Product 1', quantity: 2 },
        { _id: '2', name: 'Product 2', quantity: 3 },
      ],
    };
    const action = resetCart();
    const result = productReducer(initialStateWithProduct, action);
    expect(result.productData).toEqual([]);
  });

  it('should handle storePaymentResponse action', () => {
    const paymentData = [{ paymentId: '123', amount: 100 }];
    const action = storePaymentResponse(paymentData);
    const result = productReducer(initialState, action);
    expect(result.paymentInfo).toEqual(paymentData);
  });
});
