import { IValidation } from "../interfaces/index";

/**
 * Validates the product object fields against specific rules.
 *
 * @param {IValidation} product - The product object containing title, price, description, and imgURL.
 * @returns  errors - An object containing error messages for each invalid field.
 *
 * The validation rules are:
 * - Title: Must be between 10 and 80 characters.
 * - Price: Must be a valid number.
 * - Description: Cannot be empty.
 * - imgURL: Must be a valid URL pointing to an image (png, jpg, jpeg, gif, bmp) and between 10 and 900 characters.
 * - colors: Must have a least one color.
 */
export const productValidation = (product: IValidation) => {
	const errors = {
		title: "",
		price: "",
		description: "",
		imgURL: "",
		colors: "",
	};

	const title = product.title.trim();
	const imgURL = product.imgURL.trim();
	const price = product.price.trim();
	const description = product.description.trim();

	const imgUrlRegex = /^(https?:\/\/.*\.(.*))$/i;

	if (!price || isNaN(Number(price))) {
		errors.price = "Product price must be a number";
	}

	if (!description || description.length < 10 || description.length > 80) {
		errors.description = "Product description must be provided";
	}

	if (!title || title.length < 8 || title.length > 80) {
		errors.title = "Product title must be between 10 and 80 characters";
	}

	if (
		!imgURL ||
		imgURL.length < 10 ||
		imgURL.length > 900 ||
		!imgUrlRegex.test(imgURL)
	) {
		errors.imgURL = "Product image URL must be between 10 and 900 characters";
	}

	if (product.colors.length === 0)
		errors.colors = "Product must have at least one color";

	return errors;
};
