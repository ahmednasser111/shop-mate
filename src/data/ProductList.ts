import { IProduct } from "../interfaces/index";
import { v4 as uuidv4 } from "uuid";
const productList: IProduct[] = [
	{
		id: uuidv4(),
		title: "Stylish T-Shirt",
		price: "29.99",
		description:
			"A comfortable and stylish t-shirt available in multiple colors.",
		imgURL:
			"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&auto=format&fit=crop&q=60",
		colors: ["#FF0000", "#0000FF", "#008000"],
		category: {
			id: uuidv4(),
			name: "Apparel",
			imgURL:
				"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&auto=format&fit=crop&q=60",
		},
	},
	{
		id: uuidv4(),
		title: "Wireless Headphones",
		price: "89.99",
		description: "High-quality wireless headphones with noise cancellation.",
		imgURL:
			"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&auto=format&fit=crop&q=60",
		colors: ["#000000"],
		category: {
			id: uuidv4(),
			name: "Electronics",
			imgURL:
				"https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=400&auto=format&fit=crop&q=60",
		},
	},
	{
		id: uuidv4(),
		title: "Running Shoes",
		price: "69.99",
		description: "Lightweight and comfortable running shoes for all terrains.",
		imgURL:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&auto=format&fit=crop&q=60",
		colors: ["#000000", "#808080", "#0000FF"],
		category: {
			id: uuidv4(),
			name: "Footwear",
			imgURL:
				"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&auto=format&fit=crop&q=60",
		},
	},
	{
		id: uuidv4(),
		title: "Smart Watch",
		price: "199.99",
		description: "A sleek smart watch with fitness tracking.",
		imgURL:
			"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&auto=format&fit=crop&q=60",
		colors: ["#000000", "#C0C0C0"],
		category: {
			id: uuidv4(),
			name: "Electronics",
			imgURL:
				"https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=400&auto=format&fit=crop&q=60",
		},
	},
	{
		id: uuidv4(),
		title: "Leather Jacket",
		price: "149.99",
		description: "A classic leather jacket with a modern fit.",
		imgURL:
			"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&auto=format&fit=crop&q=60",
		colors: ["#000000", "#8B4513"],
		category: {
			id: uuidv4(),
			name: "Apparel",
			imgURL:
				"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&auto=format&fit=crop&q=60",
		},
	},
	{
		id: uuidv4(),
		title: "Bluetooth Speaker",
		price: "59.99",
		description: "Portable Bluetooth speaker with high-quality sound.",
		imgURL:
			"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&auto=format&fit=crop&q=60",
		colors: ["#FF0000", "#0000FF", "#808080"],
		category: {
			id: uuidv4(),
			name: "Electronics",
			imgURL:
				"https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=400&auto=format&fit=crop&q=60",
		},
	},
	{
		id: uuidv4(),
		title: "Digital Camera",
		price: "499.99",
		description: "High-resolution digital camera with optical zoom.",
		imgURL:
			"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&auto=format&fit=crop&q=60",
		colors: ["#000000", "#C0C0C0"],
		category: {
			id: uuidv4(),
			name: "Electronics",
			imgURL:
				"https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=400&auto=format&fit=crop&q=60",
		},
	},
	{
		id: uuidv4(),
		title: "Backpack",
		price: "39.99",
		description: "Durable backpack with multiple compartments.",
		imgURL:
			"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&auto=format&fit=crop&q=60",
		colors: ["#000000", "#000080", "#808080"],
		category: {
			id: uuidv4(),
			name: "Accessories",
			imgURL:
				"https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=400&h=400&auto=format&fit=crop&q=60",
		},
	},
	{
		id: uuidv4(),
		title: "Sunglasses",
		price: "29.99",
		description: "Stylish sunglasses with UV protection.",
		imgURL:
			"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&auto=format&fit=crop&q=60",
		colors: ["#000000", "#8B4513", "#808080"],
		category: {
			id: uuidv4(),
			name: "Accessories",
			imgURL:
				"https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=400&h=400&auto=format&fit=crop&q=60",
		},
	},
	{
		id: uuidv4(),
		title: "Fitness Tracker",
		price: "79.99",
		description: "A fitness tracker with heart rate monitoring.",
		imgURL:
			"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&auto=format&fit=crop&q=60",
		colors: ["#000000", "#0000FF", "#800080"],
		category: {
			id: uuidv4(),
			name: "Electronics",
			imgURL:
				"https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=400&auto=format&fit=crop&q=60",
		},
	},
];

export default productList;
