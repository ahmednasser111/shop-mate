import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ICartItem } from "../../interfaces/index";

// Define a type for the slice state
export interface CartState {
	items: ICartItem[];
}

// Define the initial state using that type
const initialState: CartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<IProduct>) => {
			const exists = state.items.find((item) => action.payload.id === item.id);
			if (exists) {
				exists.qty++;
			} else {
				const newItems = state.items.slice();
				newItems.push({ ...action.payload, qty: 1 });
				state.items = newItems;
			}
		},
		remove: (state, action: PayloadAction<IProduct>) => {
			state.items = state.items.filter((item) => item.id !== action.payload.id);
		},
		clear: (state) => {
			state.items = [];
		},
	},
});

export const { add, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;
