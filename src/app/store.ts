import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import ProductsSlice from "./features/ProductsSlice";
// ...

export const store = configureStore({
	reducer: {
		cart: cartSlice,
		products: ProductsSlice,
	},
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
