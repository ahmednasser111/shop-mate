import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useState,
} from "react";
import Product from "./components/Product/Product";
import Button from "./components/ui/Button";
import ColorCircle from "./components/ui/ColorCircle";
import Input from "./components/ui/Input";
import MyModal from "./components/ui/MyModal";
import Colors from "./data/Colors";
import FormInputs from "./data/FormInputs";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import Select from "./components/ui/Select";
import categoryList from "./data/CategoryList";
import { defaultProduct } from "./data/defaults";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { getProductList } from "./app/features/ProductsSlice";
import { Toaster } from "react-hot-toast";

const defaultErrors = {
	title: "",
	description: "",
	imgURL: "",
	price: "",
	colors: "",
};

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [product, setProduct] = useState<IProduct>(defaultProduct);
	const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
	const [errors, setErrors] = useState(defaultErrors);
	const [category, setCategory] = useState(categoryList[0]);
	const [editIndex, setEditIndex] = useState<number>(0);

	const cart = useAppSelector((state) => state.cart.items);
	const productList = useAppSelector((state) => state.products.list);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getProductList());
	}, [dispatch]);

	const resetForm = useCallback(() => {
		setProduct(defaultProduct);
		setErrors(defaultErrors);
		setIsOpen(false);
	}, []);

	const handleAddProduct = useCallback(() => {
		// setProducts((prev) => [{ ...product, id: uuidv4() }, ...prev]);
		resetForm();
	}, [product, resetForm]);

	const handleEditProduct = useCallback(() => {
		// setProducts((prev) =>
		// 	prev.map((p, i) => (i === editIndex ? productToEdit : p))
		// );
		setIsEditOpen(false);
	}, [editIndex, productToEdit]);

	const handleInputChangeAdd = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setProduct((prev: IProduct) => ({ ...prev, [name]: value }));
			setErrors((prev) => ({ ...prev, [name]: "" }));
		},
		[]
	);

	const handleInputChangeEdit = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setProductToEdit((prev: IProduct) => ({ ...prev, [name]: value }));
			setErrors((prev) => ({ ...prev, [name]: "" }));
		},
		[]
	);

	const validateAndSubmit =
		(onSubmit: () => void, product: IProduct) => (e: FormEvent) => {
			e.preventDefault();
			const validationErrors = productValidation({
				title: product.title,
				description: product.description,
				price: product.price,
			});

			if (Object.values(validationErrors).some((error) => error)) {
				setErrors(validationErrors);
				return;
			}

			product.category = category;
			onSubmit();
		};

	const renderForm = (
		product: IProduct,
		updateProduct: (p: IProduct) => void,
		onSubmit: () => void,
		handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
	) => (
		<form
			className="flex flex-col"
			onSubmit={validateAndSubmit(onSubmit, product)}>
			{FormInputs.map(({ id, name, label, type }) => (
				<label
					key={id}
					htmlFor={id}
					className="flex flex-col text-sm font-medium text-gray-700 mb-3">
					{label}
					<Input
						type={type}
						id={id}
						name={name}
						value={product[name]}
						onChange={handleInputChange}
					/>
					{errors[name] && (
						<div className="text-red-700 text-sm font-semibold">
							{errors[name]}
						</div>
					)}
				</label>
			))}

			<Select selected={category} setSelected={setCategory} />

			<div className="flex items-center gap-2 my-5">
				{Object.keys(Colors).map((color) => (
					<ColorCircle
						key={color}
						color={color}
						setProduct={updateProduct}
						product={product}
					/>
				))}
			</div>

			{errors.colors && (
				<div className="text-red-700 text-sm font-semibold">
					{errors.colors}
				</div>
			)}

			<div className="flex gap-3 mt-5">
				<Button
					className="bg-emerald-600 text-white font-medium py-2 px-4 rounded hover:bg-emerald-700 transition duration-200"
					width="flex-1">
					Submit
				</Button>
				<Button
					className="bg-red-600 text-white font-medium py-2 px-4 rounded hover:bg-red-700 transition duration-200"
					width="flex-1"
					onClick={resetForm}>
					Close
				</Button>
			</div>
		</form>
	);

	const openAddModal = useCallback(() => setIsOpen(true), []);
	const openEditModal = useCallback(() => setIsEditOpen(true), []);

	return (
		<main className="container p-2">
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

			<MyModal isOpen={isOpen} onClose={resetForm} title="Add Product">
				{renderForm(
					product,
					setProduct,
					handleAddProduct,
					handleInputChangeAdd
				)}
			</MyModal>

			<MyModal
				isOpen={isEditOpen}
				onClose={() => setIsEditOpen(false)}
				title="Edit Product">
				{renderForm(
					productToEdit,
					setProductToEdit,
					handleEditProduct,
					handleInputChangeEdit
				)}
			</MyModal>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2">
				{productList.map((product, idx) => (
					<Product
						key={product.id}
						idx={idx}
						product={product}
						setProductToEdit={setProductToEdit}
						setIsEditOpen={openEditModal}
						setIdx={setEditIndex}
					/>
				))}
			</div>
			<Toaster position="bottom-center" />
		</main>
	);
}

export default App;
