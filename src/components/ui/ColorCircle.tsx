import { memo } from "react";
import { IProduct } from "../../interfaces/index";

interface IProps {
	color: string;
	setProduct: (p: IProduct) => void;
	product: IProduct;
}
function ColorCircle({ color, setProduct, product }: IProps) {
	return (
		<span
			style={{ backgroundColor: color }}
			className="rounded-full w-5 h-5 block cursor-pointer"
			onClick={() => {
				setProduct({
					...product,
					colors: product.colors.includes(color)
						? product.colors.filter((c) => c !== color)
						: [...product.colors, color],
				});
			}}></span>
	);
}
export default memo(ColorCircle);
