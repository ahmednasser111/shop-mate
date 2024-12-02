import { ButtonHTMLAttributes, memo, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
	width?: "flex-1" | "w-fit";
}
function Button({ children, className, width = "w-fit", ...rest }: IProps) {
	return (
		<button
			className={`${width} rounded-md p-2 text-white ${className}`}
			{...rest}>
			{children}
		</button>
	);
}
export default memo(Button);
