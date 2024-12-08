import React, { useState, useCallback, useMemo } from "react";
import { Toaster } from "react-hot-toast";

// Hooks and Redux
import { useAppSelector } from "../app/hooks";
import { useGetProductListQuery } from "../app/features/ProductsSlice";

// Types and Constants
import { IProduct } from "../interfaces";
import { defaultProduct } from "../data/defaults";
import categoryList from "../data/CategoryList";
import FormInputs from "../data/FormInputs";

// Validation
import { productValidation } from "../validation";

// Components
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import MyModal from "../components/ui/MyModal";
import Product from "../components/Product/Product";

// Initial error state
const INITIAL_ERRORS = {
	title: "",
	description: "",
	imgURL: "",
	price: "",
	colors: "",
};

function Home() {
	// State Management
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [productToAdd, setProductToAdd] = useState<IProduct>(defaultProduct);
	const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
	const [errors, setErrors] = useState(INITIAL_ERRORS);
	const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
	const [, setEditIndex] = useState(0);

	// Selectors and Queries
	const cart = useAppSelector((state) => state.cart.items);
	const { data, isLoading, error } = useGetProductListQuery(undefined);

	// Form Reset Utility
	const resetForm = useCallback((isAdd = true) => {
		if (isAdd) {
			setProductToAdd(defaultProduct);
			setIsAddModalOpen(false);
		} else {
			setProductToEdit(defaultProduct);
			setIsEditModalOpen(false);
		}
		setErrors(INITIAL_ERRORS);
	}, []);

	// Input Change Handlers
	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
			const { name, value } = e.target;
			const setter = isEdit ? setProductToEdit : setProductToAdd;

			setter((prev) => ({ ...prev, [name]: value }));
			setErrors((prev) => ({ ...prev, [name]: "" }));
		},
		[]
	);

	// Validation and Submission Utility
	const validateAndPrepareProduct = useCallback(
		(product: IProduct) => {
			const validationErrors = productValidation({
				title: product.title,
				description: product.description,
				price: product.price,
			});

			if (Object.values(validationErrors).some((error) => error)) {
				setErrors(validationErrors);
				return null;
			}

			return { ...product, category: selectedCategory };
		},
		[selectedCategory]
	);

	// Modal Open Handlers
	const openAddModal = useCallback(() => setIsAddModalOpen(true), []);
	const openEditModal = useCallback((product: IProduct, index: number) => {
		setProductToEdit(product);
		setSelectedCategory(product.category || categoryList[0]);
		setEditIndex(index);
		setIsEditModalOpen(true);
	}, []);

	// Render Form Utility
	const renderProductForm = useCallback(
		(product: IProduct, isEdit: boolean) => {
			const handleSubmit = (e: React.FormEvent) => {
				e.preventDefault();
				const validatedProduct = validateAndPrepareProduct(
					isEdit ? productToEdit : productToAdd
				);

				if (!validatedProduct) return;

				// TODO: Implement actual product add/edit logic
				if (isEdit) {
					// Update product
					resetForm(false);
				} else {
					// Add product
					resetForm(true);
				}
			};

			return (
				<form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
					{FormInputs.map(({ id, name, label, type }) => (
						<div key={id} className="flex flex-col">
							<label
								htmlFor={id}
								className="text-sm font-medium text-gray-700 mb-2">
								{label}
							</label>
							<Input
								type={type}
								id={id}
								name={name}
								value={product[name] || ""}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									handleInputChange(e, isEdit)
								}
								className={errors[name] ? "border-red-500" : ""}
							/>
							{errors[name] && (
								<p className="text-red-500 text-xs mt-1">{errors[name]}</p>
							)}
						</div>
					))}

					<div className="flex justify-between space-x-4">
						<Button
							type="submit"
							className="bg-emerald-600 text-white hover:bg-emerald-700 flex-1">
							{isEdit ? "Update" : "Add"}
						</Button>
						<Button
							type="button"
							className="bg-red-600 text-white hover:bg-red-700 flex-1"
							onClick={() => resetForm(isEdit)}>
							Cancel
						</Button>
					</div>
				</form>
			);
		},
		[
			productToAdd,
			productToEdit,
			errors,
			selectedCategory,
			handleInputChange,
			validateAndPrepareProduct,
			resetForm,
		]
	);

	// Render Products Grid
	const renderProductsGrid = useMemo(() => {
		if (isLoading) return <div>Loading products...</div>;
		if (error) return <div>Error loading products</div>;

		return (
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2">
				{data?.products?.map((product, idx) => (
					<Product
						key={product.id}
						idx={idx}
						product={product}
						setProductToEdit={setProductToEdit}
						setIsEditOpen={() => openEditModal(product, idx)}
						setIdx={setEditIndex}
					/>
				))}
			</div>
		);
	}, [data, isLoading, error, openEditModal]);

	return (
		<main className="container p-2">
			{/* Header */}
			<header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
				<h1 className="text-xl font-semibold text-gray-900">Latest Products</h1>
				<div className="flex justify-between items-center space-x-5">
					<div>Cart: {cart.length}</div>
					<Button
						className="bg-emerald-600 text-white font-medium py-2 px-4 rounded hover:bg-emerald-700 transition duration-200"
						onClick={openAddModal}>
						Add
					</Button>
				</div>
			</header>

			{/* Add Product Modal */}
			<MyModal
				isOpen={isAddModalOpen}
				onClose={() => resetForm(true)}
				title="Add Product">
				{renderProductForm(productToAdd, false)}
			</MyModal>

			{/* Edit Product Modal */}
			<MyModal
				isOpen={isEditModalOpen}
				onClose={() => resetForm(false)}
				title="Edit Product">
				{renderProductForm(productToEdit, true)}
			</MyModal>

			{/* Products Grid */}
			{renderProductsGrid}

			<Toaster position="bottom-center" />
		</main>
	);
}

export default Home;
