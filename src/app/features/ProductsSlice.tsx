import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define an API slice for products
const productSlice = createApi({
	reducerPath: "productApi", // Optional: for debugging purposes
	tagTypes: ["Products"], // Cache management
	baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
	endpoints: (builder) => ({
		getProductList: builder.query({
			query: () => "/products/category/vehicle",
			providesTags: (result) =>
				result ? [{ type: "Products", id: "LIST" }] : [], // Cache management
		}),
		getProductById: builder.query({
			query: (id) => `/products/${id}`,
		}),
	}),
});

export const { useGetProductListQuery, useGetProductByIdQuery } = productSlice;
export default productSlice;
