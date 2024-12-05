export interface IProduct {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	images: string[];
	discountPercentage?: number;
	rating?: number;
	stock?: number;
	tags?: string[];
	brand?: string;
	sku?: string;
	weight?: number;
	dimensions?: {
		width: number;
		height: number;
		depth: number;
	};
	warrantyInformation?: string;
	shippingInformation?: string;
	availabilityStatus?: string;
	reviews?: IReview[];
	returnPolicy?: string;
	minimumOrderQuantity?: number;
	meta?: {
		createdAt: string;
		updatedAt: string;
		barcode: string;
		qrCode: string;
	};
	thumbnail?: string;
}

export interface ProductListResponse {
	products: IProduct[];
	total: number;
	skip: number;
	limit: number;
}
export interface IReview {
	rating: number;
	comment: string;
	date: string;
	reviewerName: string;
	reviewerEmail: string;
}
export interface IValidation {
	title: string;
	price: number;
	description: string;
}
export interface IInputs {
	id: string;
	name: "title" | "description" | "price";
	label: string;
	type: string;
}

export interface IProductInputs {
	title: string;
	desc: string;
	price: number;
}

export interface ICartItem extends IProduct {
	qty: number;
}
