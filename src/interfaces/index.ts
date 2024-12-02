export interface IProduct {
	id?: string;
	title: string;
	price: string;
	description: string;
	images: string[];
	category: ICategory;
	colors: string[];
}
export interface IValidation {
	title: string;
	price: string;
	description: string;
	colors: string[];
}
export interface ICategory {
	id: string;
	name: string;
	imgURL: string;
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
	price: string;
}

export interface ICartItem extends IProduct {
	qty: number;
}
