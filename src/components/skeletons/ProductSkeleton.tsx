const ProductSkeleton = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="bg-white shadow-lg rounded-lg overflow-hidden">
				<div className="p-6">
					<div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="aspect-square bg-gray-200 rounded-lg"></div>
						<div className="space-y-4">
							<div className="h-4 bg-gray-200 rounded w-full"></div>
							<div className="h-4 bg-gray-200 rounded w-3/4"></div>
							<div className="h-6 bg-gray-200 rounded w-1/4"></div>
							<div className="h-4 bg-gray-200 rounded w-1/2"></div>
							<div className="h-4 bg-gray-200 rounded w-1/3"></div>
						</div>
					</div>
				</div>
				<div className="px-6 py-4 bg-gray-50">
					<div className="h-10 bg-gray-200 rounded w-1/4"></div>
				</div>
			</div>
		</div>
	);
};
export default ProductSkeleton;
