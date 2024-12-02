import { v4 as uuidv4 } from "uuid";
import { ICategory } from "../interfaces/index";

const categoryList: ICategory[] = [
	{
		id: uuidv4(),
		name: "Apparel",
		imgURL:
			"https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&auto=format&fit=crop&q=60",
	},
	{
		id: uuidv4(),
		name: "Electronics",
		imgURL:
			"https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=400&auto=format&fit=crop&q=60",
	},
	{
		id: uuidv4(),
		name: "Footwear",
		imgURL:
			"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&auto=format&fit=crop&q=60",
	},
	{
		id: uuidv4(),
		name: "Accessories",
		imgURL:
			"https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=400&h=400&auto=format&fit=crop&q=60",
	},
];

export default categoryList;
