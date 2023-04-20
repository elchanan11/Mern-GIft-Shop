import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products: [],
        quantity: 0,
        total: 0,
        totalDiscount: 0,
        productQuantity: 0
    },
    reducers: {
        addProduct: (state,action)=>{
            state.quantity = state.quantity + action.payload.quantity;
            state.productQuantity = action.payload.quantity;
            state.products.push(action.payload.product);
            state.total += parseInt(action.payload.product.updatedPrice) * action.payload.quantity
            state.totalDiscount += action.payload.product.price - action.payload.product.updatedPrice
        },
        deleteProducts: (state)=>{
            state.quantity = 0;
            state.productQuantity = 0;
            state.products = [];
            state.total = 0;
            state.totalDiscount = 0;
            state.index = 0;
        },
        deleteOneProduct: (state,action)=>{
            state.quantity = state.quantity - 1;
            state.productQuantity = state.quantity - 1;
            state.products.splice(action.payload.index,1);
            state.total = state.total - action.payload.product.updatedPrice;
            state.totalDiscount = state.totalDiscount - (action.payload.product.price - action.payload.product.updatedPrice);
        },
    },
})

export const {addProduct} = cartSlice.actions;
export const {deleteProducts} = cartSlice.actions;
export const {deleteOneProduct} = cartSlice.actions;
export default cartSlice.reducer;