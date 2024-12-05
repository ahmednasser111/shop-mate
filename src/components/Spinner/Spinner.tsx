import React from "react";

const Spinner: React.FC = () => {
	return (
		<div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-50">
			<div className="relative">
				<div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-600 text-xs">
					Loading
				</div>
			</div>
		</div>
	);
};

export default Spinner;
