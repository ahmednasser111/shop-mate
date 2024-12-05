import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../app/features/ProductsSlice";
import { Star } from "lucide-react";
import { IReview } from "../interfaces/index";
import ProductSkeleton from "../components/skeletons/ProductSkeleton";

const ProductDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const idNumber = Number(id);
	const { data: product, isLoading, error } = useGetProductByIdQuery(idNumber);

	if (isLoading) return <ProductSkeleton />;
	if (error)
		return (
			<div className="text-center text-red-500">
				Error fetching product details
			</div>
		);

	if (!product) return <div className="text-center">Product not found</div>;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="bg-white shadow-lg rounded-lg overflow-hidden">
				<div className="p-6">
					<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
						{product.title}
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="relative aspect-square overflow-hidden rounded-lg">
							<img
								src={product.images[0] || "/placeholder.svg"}
								alt={product.title}
								className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
							/>
						</div>
						<div className="space-y-4">
							<p className="text-lg">{product.description}</p>
							<div className="flex items-center space-x-2">
								<span className="text-2xl font-bold">
									${product.price.toFixed(2)}
								</span>
								{product.discountPercentage && (
									<span className="text-sm text-green-600">
										({product.discountPercentage}% off)
									</span>
								)}
							</div>
							<div className="flex items-center space-x-2">
								<Star className="w-5 h-5 text-yellow-400" />
								<span>{product.rating || "No ratings"}</span>
							</div>
							<p>Category: {product.category}</p>
							<p>Brand: {product.brand}</p>
							<p>In Stock: {product.stock}</p>
							{product.dimensions && (
								<p>
									Dimensions: {product.dimensions.width} x{" "}
									{product.dimensions.height} x {product.dimensions.depth}
								</p>
							)}
							{product.weight && <p>Weight: {product.weight} kg</p>}
							{product.warrantyInformation && (
								<p>Warranty: {product.warrantyInformation}</p>
							)}
						</div>
					</div>
				</div>
				<div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
					<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
						Add to Cart
					</button>
					{product.returnPolicy && (
						<span className="text-sm text-gray-600">
							{product.returnPolicy}
						</span>
					)}
				</div>
			</div>
			{product.reviews && product.reviews.length > 0 && (
				<div className="mt-8">
					<h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
					<div className="space-y-4">
						{product.reviews.map((review: IReview, index: number) => (
							<div key={index} className="bg-white shadow rounded-lg p-4">
								<div className="font-bold">{review.reviewerName}</div>
								<div className="flex items-center space-x-2 mb-2">
									<Star className="w-5 h-5 text-yellow-400" />
									<span>{review.rating}</span>
								</div>
								<p>{review.comment}</p>
								<div className="text-sm text-gray-600 mt-2">
									{new Date(review.date).toLocaleDateString()}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetail;
