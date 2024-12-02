import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/index";
import axiosInstance from "../../api/axios.config";

// Define a type for the slice state
export interface ProductsState {
	list: IProduct[];
	state: "idle" | "loading" | "succeeded" | "failed";
}

// Define the initial state using that type
const initialState: ProductsState = {
	list: [],
	state: "idle",
};

export const getProductList = createAsyncThunk(
	"products/getProductList",
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			// get method
			const { data } = await axiosInstance.get(
				"/products/category/vehicle?limit=10"
			);
			return data.products;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const ProductsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<IProduct>) => {},
		remove: (state, action: PayloadAction<IProduct>) => {
			state.list = state.list.filter((item) => item.id !== action.payload.id);
		},
		clear: (state) => {
			state.list = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProductList.pending, (state) => {
			state.state = "loading";
		});
		builder.addCase(getProductList.fulfilled, (state, action) => {
			state.state = "succeeded";
			state.list = action.payload;
		});
	},
});

export const { add, remove, clear } = ProductsSlice.actions;

export default ProductsSlice.reducer;
