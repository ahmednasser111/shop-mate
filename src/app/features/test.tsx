import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../../interfaces/index";
import { RootState } from "../store"; // Adjust import as needed

// Define a type for the slice state with more comprehensive properties
export interface ProductsState {
	productList: IProduct[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
	totalItems: number;
	totalPrice: number;
}

// Define the initial state using that type
const initialState: ProductsState = {
	productList: [],
	status: "idle",
	error: null,
	totalItems: 0,
	totalPrice: 0,
};

// Async thunk for fetching product list using Axios
export const fetchProductList = createAsyncThunk(
	"products/fetchProductList",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get<IProduct[]>("/api/products");
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data || error.message);
			}
			return rejectWithValue("An unknown error occurred");
		}
	}
);

// Async thunk for adding a product with Axios
export const addProductAsync = createAsyncThunk(
	"products/addProductAsync",
	async (product: IProduct, { rejectWithValue }) => {
		try {
			const response = await axios.post<IProduct>("/api/products", product);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data || error.message);
			}
			return rejectWithValue("An unknown error occurred");
		}
	}
);

// Async thunk for updating a product using Axios
export const updateProductAsync = createAsyncThunk(
	"products/updateProductAsync",
	async (product: IProduct, { rejectWithValue }) => {
		try {
			const response = await axios.put<IProduct>(
				`/api/products/${product.id}`,
				product
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data || error.message);
			}
			return rejectWithValue("An unknown error occurred");
		}
	}
);

// Async thunk for deleting a product using Axios
export const deleteProductAsync = createAsyncThunk(
	"products/deleteProductAsync",
	async (productId: string, { rejectWithValue }) => {
		try {
			await axios.delete(`/api/products/${productId}`);
			return productId;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data || error.message);
			}
			return rejectWithValue("An unknown error occurred");
		}
	}
);

export const ProductsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		// Add product to cart with advanced logic
		add: (state, action: PayloadAction<IProduct>) => {
			const existingProduct = state.productList.find(
				(item) => item.id === action.payload.id
			);

			if (existingProduct) {
				// Increment quantity if product exists
				existingProduct.qty++;
			} else {
				// Add new product with initial quantity
				state.productList.push({
					...action.payload,
					qty: 1,
				});
			}

			// Update total items and price
			state.totalItems = state.productList.reduce(
				(total, product) => total + product.qty,
				0
			);
			state.totalPrice = state.productList.reduce(
				(total, product) => total + product.price * product.qty,
				0
			);
		},

		// Remove single item or decrease quantity
		remove: (state, action: PayloadAction<IProduct>) => {
			const existingProduct = state.productList.find(
				(item) => item.id === action.payload.id
			);

			if (existingProduct && existingProduct.qty > 1) {
				// Decrease quantity
				existingProduct.qty--;
			} else {
				// Remove product entirely if quantity is 1
				state.productList = state.productList.filter(
					(item) => item.id !== action.payload.id
				);
			}

			// Update total items and price
			state.totalItems = state.productList.reduce(
				(total, product) => total + product.qty,
				0
			);
			state.totalPrice = state.productList.reduce(
				(total, product) => total + product.price * product.qty,
				0
			);
		},

		// Clear entire cart
		clear: (state) => {
			state.productList = [];
			state.totalItems = 0;
			state.totalPrice = 0;
		},
	},
	extraReducers: (builder) => {
		// Handle fetch product list
		builder
			.addCase(fetchProductList.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProductList.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.productList = action.payload;
				state.totalItems = action.payload.reduce(
					(total, product) => total + (product.qty || 0),
					0
				);
				state.totalPrice = action.payload.reduce(
					(total, product) => total + (product.price || 0) * (product.qty || 0),
					0
				);
			})
			.addCase(fetchProductList.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})

			// Handle add product
			.addCase(addProductAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(addProductAsync.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.productList.push(action.payload);
				state.totalItems++;
				state.totalPrice += action.payload.price;
			})
			.addCase(addProductAsync.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})

			// Handle update product
			.addCase(updateProductAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateProductAsync.fulfilled, (state, action) => {
				state.status = "succeeded";
				const index = state.productList.findIndex(
					(p) => p.id === action.payload.id
				);
				if (index !== -1) {
					state.productList[index] = action.payload;
				}
			})
			.addCase(updateProductAsync.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})

			// Handle delete product
			.addCase(deleteProductAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteProductAsync.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.productList = state.productList.filter(
					(p) => p.id !== action.payload
				);
				// Recalculate totals
				state.totalItems = state.productList.reduce(
					(total, product) => total + product.qty,
					0
				);
				state.totalPrice = state.productList.reduce(
					(total, product) => total + product.price * product.qty,
					0
				);
			})
			.addCase(deleteProductAsync.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			});
	},
});

// Selector for getting cart details
export const selectProductDetails = (state: RootState) => ({
	products: state.products.list,
	totalItems: state.products.totalItems,
	totalPrice: state.products.totalPrice,
	status: state.products.status,
	error: state.products.error,
});

export const { add, remove, clear } = ProductsSlice.actions;

export default ProductsSlice.reducer;
