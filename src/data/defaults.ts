import { IProduct } from "../interfaces";
import { v4 as uuidv4 } from "uuid";

export const defaultProduct: IProduct = {
	title: "",
	description: "",
	imgURL: "",
	price: "",
	colors: [],
	category: { id: uuidv4(), name: "", imgURL: "" },
};
