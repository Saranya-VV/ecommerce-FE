import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productData: [],
  userInfo: null,
  paymentInfo:[],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    increamentQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    // // =============== User Start here ==============
    // addUser: (state, action) => {
    //   state.userInfo = action.payload;
    // },
    // removeUser: (state) => {
    //   state.userInfo = null;
    // },
    // // =============== User End here ================
     // =============== Payment Reducers ===============
     storePaymentResponse: (state, action) => {
      state.paymentInfo = action.payload;
    },
    
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increamentQuantity,
  decrementQuantity,
  addUser,
  removeUser,
  storePaymentResponse
} = productSlice.actions;

export default productSlice.reducer;
