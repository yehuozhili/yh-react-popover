import React, {
	CSSProperties,
	PropsWithChildren,
	ReactNode,
	useEffect,
	useMemo,
} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
	constnode: ReactNode;
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	closeFuncCallback?: Function;
	innerDomStyle?: CSSProperties;
	innerConstDomStyle?: CSSProperties;
	setState: Function;
	state: boolean;
	unmount: Function;
}

export const mount = document.body;

export function Modal(props: PropsWithChildren<ModalProps>) {
	const {
		constnode,
		visible,
		closeFuncCallback,
		innerDomStyle,
		innerConstDomStyle,
		state,
		setState,
		unmount,
	} = props;

	const render = useMemo(() => {
		if (visible) {
			return createPortal(
				<div
					className={`${
						state === true ? "yhmodalopen" : "yhmodalclose"
					}`}
					style={{
						...innerDomStyle,
					}}
				>
					{props.children}
				</div>,
				mount
			);
		} else {
			unmount();
			return null;
		}
	}, [innerDomStyle, props.children, state, unmount, visible]);

	useEffect(() => {
		if (closeFuncCallback) {
			closeFuncCallback(setState);
		}
	}, [closeFuncCallback, setState]);

	return (
		<>
			{render}
			<div
				style={{ display: "inline-block", ...innerConstDomStyle }}
				onClick={() => setState(!visible)}
			>
				{constnode}
			</div>
		</>
	);
}

export default Modal;
