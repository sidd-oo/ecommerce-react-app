import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        cartQty: 0,
        totalPrice: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.cartQty += 1;
            state.products.push(action.payload);
            state.totalPrice += action.payload.price * action.payload.productQty;
        },
    },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;