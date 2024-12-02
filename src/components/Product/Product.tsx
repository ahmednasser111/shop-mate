import { memo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ICategory, IProduct } from "../../interfaces/index";
import Image from "../Image/Image";
import Button from "../ui/Button";
import ColorCircle from "../ui/ColorCircle";
import MyModal from "../ui/MyModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { add, remove } from "../../app/features/cartSlice";

interface IProps {
	product: IProduct;
	setProductToEdit: (p: IProduct) => void;
	setIsEditOpen: (b: boolean) => void;
	idx: number;
	setIdx: (n: number) => void;
	setCategory: (c: ICategory) => void;
}

/**
 * Product component displays detailed information about a product.
 *
 * @param {IProps} props - The properties for the Product component.
 * @returns {JSX.Element} The rendered Product component.
 */
function Product({
	product,
	setProductToEdit,
	setIsEditOpen,
	idx,
	setIdx,
	setCategory,
}: IProps) {
	const cart = useAppSelector((state) => state.cart.items);
	const dispatch = useAppDispatch();
	const { title, price, description, images, category, colors } = product;
	/**
	 * Handles the edit action for the product.
	 * Sets up the product for editing and opens the edit modal.
	 */
	function handleEdit() {
		setProductToEdit(product);
		setIdx(idx);
		setCategory(product.category);
		setIsEditOpen(true);
	}

	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	return (
		<div className="rounded-md border-2 p-3 bg-neutral-100">
			<Image
				src={images[0]}
				alt={title}
				className="w-full h-64 object-cover rounded-md"
			/>
			<h3 className="my-5 text-xl font-bold">{title}</h3>
			<p className="my-5 line-clamp-3 h-[72px]">{description}</p>
			<div className="flex items-center gap-2 my-5">
				{colors &&
					colors.map((c, i) => (
						<ColorCircle
							color={c}
							key={i}
							setProduct={setProductToEdit}
							product={product}
						/>
					))}
			</div>
			<div className="flex justify-between items-center">
				<span>${price}</span>
				<Image
					src={category.imgURL}
					alt={category.name}
					className="rounded-full w-8 h-8"
				/>
			</div>
			<div className="flex gap-4 my-2">
				<Button className="bg-blue-900" width="flex-1" onClick={handleEdit}>
					EDIT
				</Button>
				<Button
					className="bg-red-900"
					width="flex-1"
					onClick={() => setIsDeleteOpen(true)}>
					DELETE
				</Button>

				<MyModal
					isOpen={isDeleteOpen}
					title="Are you sure?"
					onClose={() => setIsDeleteOpen(false)}>
					Are you sure that you want to delete this product?
					<div className="flex gap-3 mt-5">
						<Button
							className="bg-red-600 text-white font-medium py-2 px-4 rounded hover:bg-red-700 transition duration-200"
							width="flex-1"
							onClick={() => {
								// const nextProducts = products.slice();
								// nextProducts.splice(idx, 1);
								// setProducts(nextProducts);
								toast.success(`${product.title} Product has been deleted`);
							}}>
							Delete
						</Button>
						<Button
							className="bg-emerald-600 text-white font-medium py-2 px-4 rounded hover:bg-emerald-700 transition duration-200"
							width="flex-1"
							onClick={() => setIsDeleteOpen(false)}>
							Close
						</Button>
					</div>
				</MyModal>
			</div>
			<div className="flex flex-col space-y-2">
				<Button
					className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
					onClick={() => dispatch(add(product))}>
					Add to Cart
				</Button>
				<Button
					className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed"
					disabled={!cart.find((item) => item.id === product.id)}
					onClick={() => dispatch(remove(product))}>
					Remove from Cart
				</Button>
			</div>

			<Toaster />
		</div>
	);
}

export default memo(Product);
