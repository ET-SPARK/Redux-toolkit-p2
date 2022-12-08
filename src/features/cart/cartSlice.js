import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url ='https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 5,
    total:0,
    isLoading: true,
}; 

export const getCartItems = createAsyncThunk('cart/getCartItems', 
    async(name, thunkAPI) => {
      try {
        // console.log(name)
        // console.log(thunkAPI)
        // console.log(thunkAPI.getState())
        // thunkAPI.dispatch(openModal())
        const resp = await axios(url)
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue('somthing went wrong');
      }
    })


const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItems: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => 
            item.id !== itemId)    
        },
        increase: (state, {payload}) => {
            const cartItems = state.cartItems.find((item) => 
                item.id === payload.id)
                cartItems.amount = cartItems.amount + 1
        },
        decrease: (state, {payload}) => {
            const cartItems = state.cartItems.find((item) => 
                item.id === payload.id)
                cartItems.amount = cartItems.amount -1
        },
        calculateTotals : (state) =>{
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state , action) => {
            // console.log(action)
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false
        }
    }
});

// console.log(CartSlice);
export const{clearCart, removeItems,increase,decrease,
calculateTotals} = CartSlice.actions;

export default CartSlice.reducer;