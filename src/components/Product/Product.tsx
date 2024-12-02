import { memo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Heart, Edit, Trash2, ShoppingCart, Minus } from "lucide-react";
import { IProduct } from "../../interfaces/index";
import Image from "../Image/Image";
import Button from "../ui/Button";
import MyModal from "../ui/MyModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { add, remove } from "../../app/features/cartSlice";

interface IProps {
	product: IProduct;
	setProductToEdit: (p: IProduct) => void;
	setIsEditOpen: (b: boolean) => void;
	idx: number;
	setIdx: (n: number) => void;
}

function Product({
	product,
	setProductToEdit,
	setIsEditOpen,
	idx,
	setIdx,
}: IProps) {
	const cart = useAppSelector((state) => state.cart.items);
	const dispatch = useAppDispatch();
	const { title, price, description, images, category } = product;
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isWishlisted, setIsWishlisted] = useState(false);

	function handleEdit() {
		setProductToEdit(product);
		setIdx(idx);
		setIsEditOpen(true);
	}

	function handleAddToCart() {
		dispatch(add(product));
		toast.success(`${title} added to cart`, {
			icon: "🛒",
			style: {
				borderRadius: "10px",
				background: "#333",
				color: "#fff",
			},
		});
	}

	function handleRemoveFromCart() {
		dispatch(remove(product));
		toast.error(`${title} removed from cart`, {
			icon: "❌",
			style: {
				borderRadius: "10px",
				background: "#333",
				color: "#fff",
			},
		});
	}

	function handleWishlist() {
		setIsWishlisted(!isWishlisted);
		toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
			icon: "❤️",
			style: {
				borderRadius: "10px",
				background: "#333",
				color: "#fff",
			},
		});
	}

	return (
		<div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden">
			<div className="absolute top-4 right-4 z-10 flex space-x-2">
				<button
					onClick={handleWishlist}
					className={`p-2 rounded-full transition-all ${
						isWishlisted
							? "bg-red-500 text-white"
							: "bg-white/70 text-gray-600 hover:bg-red-100"
					}`}>
					<Heart size={20} fill={isWishlisted ? "white" : "none"} />
				</button>
			</div>

			<div className="relative">
				<Image
					src={images[0]}
					alt={title}
					className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
			</div>

			<div className="p-5 space-y-4">
				<div className="flex justify-between items-center">
					<h3
						className="text-xl font-bold text-gray-800 truncate max-w-[70%]"
						title={title}>
						{title}
					</h3>
					<span className="text-emerald-600 font-semibold text-lg">
						${price}
					</span>
				</div>

				<p className="text-gray-600 line-clamp-3 h-[72px]" title={description}>
					{description}
				</p>

				<div className="flex items-center justify-between text-sm text-gray-500">
					<span className="bg-gray-100 px-2 py-1 rounded-full">{category}</span>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<Button
						onClick={handleEdit}
						className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white">
						<Edit size={16} />
						<span>Edit</span>
					</Button>
					<Button
						onClick={() => setIsDeleteOpen(true)}
						className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white">
						<Trash2 size={16} />
						<span>Delete</span>
					</Button>
				</div>

				<div className="space-y-3">
					<Button
						onClick={handleAddToCart}
						className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white">
						<ShoppingCart size={16} />
						<span>Add to Cart</span>
					</Button>
					<Button
						onClick={handleRemoveFromCart}
						disabled={!cart.find((item) => item.id === product.id)}
						className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed">
						<Minus size={16} />
						<span>Remove from Cart</span>
					</Button>
				</div>
			</div>

			<MyModal
				isOpen={isDeleteOpen}
				title="Confirm Deletion"
				onClose={() => setIsDeleteOpen(false)}>
				<div className="space-y-4">
					<p className="text-gray-700">
						Are you sure you want to delete this product?
					</p>
					<div className="flex space-x-3">
						<Button
							onClick={() => {
								toast.success(`${product.title} deleted successfully`);
								setIsDeleteOpen(false);
							}}
							className="flex-1 bg-red-600 hover:bg-red-700 text-white">
							Delete
						</Button>
						<Button
							onClick={() => setIsDeleteOpen(false)}
							className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800">
							Cancel
						</Button>
					</div>
				</div>
			</MyModal>

			<Toaster position="top-right" />
		</div>
	);
}

export default memo(Product);
