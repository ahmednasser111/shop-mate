import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import ProductsSlice from "./features/ProductsSlice";

// Configure the store
export const store = configureStore({
	reducer: {
		cart: cartSlice,
		[ProductsSlice.reducerPath]: ProductsSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			ProductsSlice.middleware
		),
});

// Infer the RootState, AppDispatch, and AppStore types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
