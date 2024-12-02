import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { memo, ReactNode } from "react";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
}

function MyModal({ isOpen, onClose, title, children }: IProps) {
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			className="fixed z-10 backdrop-blur-sm inset-0">
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel className="w-full h-fit overflow-y-auto max-w-md rounded-xl p-6 backdrop-blur-md bg-neutral-100">
					<DialogTitle
						as="h2"
						className="text-lg font-medium text-gray-900 my-3">
						{title}
					</DialogTitle>
					<div>{children}</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
export default memo(MyModal);
