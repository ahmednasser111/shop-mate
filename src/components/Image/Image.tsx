interface IProps {
	src: string;
	alt: string;
	className: string;
}
function Image({ src, alt, className }: IProps) {
	return <img src={src} alt={alt} className={className} />;
}
export default Image;
