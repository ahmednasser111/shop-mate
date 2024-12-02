import { IInputs } from "../interfaces/index";

const FormInputs: IInputs[] = [
	{
		id: "title",
		name: "title",
		label: "Product Title",
		type: "text",
	},
	{
		id: "desc",
		name: "description",
		label: "Product Description",
		type: "text",
	},
	{
		id: "price",
		name: "price",
		label: "Product Price",
		type: "text",
	},
];
export default FormInputs;
