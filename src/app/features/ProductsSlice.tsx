import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	IProduct,
	IProductInputs,
	ProductListResponse,
} from "../../interfaces";

export const productApi = createApi({
	reducerPath: "productApi",
	tagTypes: ["Products"],
	baseQuery: fetchBaseQuery({
		baseUrl: "https://dummyjson.com",
		prepareHeaders: (headers) => {
			return headers;
		},
	}),
	endpoints: (builder) => ({
		// Read Operations
		getProductList: builder.query<ProductListResponse, void>({
			query: () => "/products/category/vehicle",
		}),

		getProductById: builder.query<IProduct, number>({
			query: (id) => `/products/${id}`,
			providesTags: (result, error, id) => [{ type: "Products", id }],
		}),

		// Create Operation
		createProduct: builder.mutation<IProduct, IProductInputs>({
			query: (newProduct) => ({
				url: "/products/add",
				method: "POST",
				body: newProduct,
			}),
			invalidatesTags: [{ type: "Products", id: "LIST" }],
		}),

		// Update Operation
		updateProduct: builder.mutation<IProduct, IProduct>({
			query: ({ id, ...patch }) => ({
				url: `/products/${id}`,
				method: "PUT",
				body: patch,
			}),
			// Update the cache optimistically
			async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					productApi.util.updateQueryData("getProductById", id, (draft) => {
						Object.assign(draft, patch);
					})
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: (result, error, { id }) => [
				{ type: "Products", id },
				{ type: "Products", id: "LIST" },
			],
		}),

		// Delete Operation
		deleteProduct: builder.mutation<
			{ isDeleted: boolean; deletedProduct: IProduct },
			number
		>({
			query: (id) => ({
				url: `/products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [
				{ type: "Products", id },
				{ type: "Products", id: "LIST" },
			],
		}),

		// Search Operation
		searchProducts: builder.query<IProduct[], string>({
			query: (searchTerm) => `/products/search?q=${searchTerm}`,
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Products" as const, id })),
							{ type: "Products", id: "SEARCH" },
					  ]
					: [{ type: "Products", id: "SEARCH" }],
		}),
	}),
});

// Export hooks for usage in components
export const {
	useGetProductListQuery,
	useGetProductByIdQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useSearchProductsQuery,
} = productApi;

export default productApi;
