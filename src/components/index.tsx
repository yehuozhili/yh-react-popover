import React, {
	CSSProperties,
	PropsWithChildren,
	ReactNode,
	RefObject,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import Modal from "./minifymodal";
import {
	PopDirections,
	switchPosition,
	switchTrianglePosition,
} from "./position";
import "./index.css";
import { useStateAnimation } from "./hooks";

export interface PopoverProps {
	//这个是弹窗内容
	content: ReactNode;
	//这个是方向 默认top
	directions: PopDirections;
	//回调强制刷新函数，用来重新计算位置
	callback?: (v: Function) => void;
	//用来回调关闭函数，如果content中有需要点击关闭的，使用此回调参数
	closeFuncCallback?: Function;
	//触发元素的壳的样式
	constDomStyle?: CSSProperties;
	//弹窗元素的壳的样式
	modalDomStyle?: CSSProperties;
	//小三角的元素样式
	triangleDomStyle?: CSSProperties;
	//弹窗内层壳的样式，一般不用改
	innerDomStyle?: CSSProperties;
	//触发元素内层壳的样式，一般不用改
	innerConstDomStyle?: CSSProperties;
	//modal的ref回调,一般用于绑定事件
	modalRefCallback?: (v: RefObject<HTMLDivElement>) => void;
	//要modal外关闭元素则true，否则false,default true
	needOutsideClose?: boolean;
}

function Popover(props: PropsWithChildren<PopoverProps>) {
	const {
		content,
		directions,
		children,
		callback,
		closeFuncCallback,
		constDomStyle,
		modalDomStyle,
		triangleDomStyle,
		innerDomStyle,
		innerConstDomStyle,
		modalRefCallback,
		needOutsideClose,
	} = props;
	const [visible, setVisible] = useState(false);
	const [style, setStyle] = useState<CSSProperties>({});
	const [triaStyle, setTriaStyle] = useState<CSSProperties>({});
	const [forceState, forceRender] = useState(0);
	const modalRef = useRef<HTMLDivElement>(null);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (callback) {
			callback(() => forceRender((v) => v + 1));
		}
	}, [callback]);

	//这里是常驻的dom
	const constDom = useMemo(() => {
		return (
			<div
				style={{ display: "inline-block", ...constDomStyle }}
				ref={ref}
			>
				{children}
			</div>
		);
	}, [children, constDomStyle]);

	//提供样式并定位
	const finalRender = useMemo(() => {
		return (
			<div
				style={{
					position: "absolute",
					...style,
					boxShadow:
						"0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)",
					borderRadius: "2px",
					padding: "10px",
					background: "white",
					zIndex: 2000,
					...modalDomStyle,
				}}
				ref={modalRef}
			>
				{content}
			</div>
		);
	}, [style, modalDomStyle, content]);

	//1个render需要一个小三角
	const triangle = useMemo(() => {
		return (
			<div
				style={{
					position: "absolute",
					transform: "rotate(45deg)",
					height: "8px",
					width: "8px",
					background: "#fff",
					zIndex: 2000,
					borderColor: "transparent #fff #fff transparent",
					...triaStyle,
					...triangleDomStyle,
				}}
			></div>
		);
	}, [triaStyle, triangleDomStyle]);

	useEffect(() => {
		//出现时才有modal
		if (ref.current && modalRef.current) {
			const scroll =
				document.documentElement.scrollTop + document.body.scrollTop; //移动端可能取不到

			let res = switchPosition(
				directions!,
				modalRef.current.getBoundingClientRect(),
				ref.current.getBoundingClientRect(),
				scroll
			);
			setStyle(res);
			//拿到三角形的pos
			let res2 = switchTrianglePosition(
				directions!,
				modalRef.current.getBoundingClientRect(),
				ref.current.getBoundingClientRect(),
				scroll
			);
			setTriaStyle(res2);
		}
	}, [directions, modalRef, visible, forceState]);

	useEffect(() => {
		const handler = () => {
			forceRender((prev) => prev + 1);
		};
		window.addEventListener("resize", handler);
		return () => {
			window.removeEventListener("resize", handler);
		};
	}, [forceRender]);

	useEffect(() => {
		if (modalRefCallback) {
			modalRefCallback(modalRef);
		}
	}, [modalRefCallback]);

	const [state, setState, unmount] = useStateAnimation(setVisible, 150);

	useEffect(() => {
		let listener: (event: MouseEvent) => void;
		if (needOutsideClose) {
			listener = (event: MouseEvent) => {
				if (
					!modalRef.current ||
					modalRef.current.contains(event.target as Node)
				) {
					return;
				}
				setState(false);
			};
			window.addEventListener("click", listener);
		}
		return () => {
			window.removeEventListener("click", listener);
		};
	}, [needOutsideClose, setState]);

	return (
		<>
			<Modal
				visible={visible}
				setVisible={setVisible}
				constnode={constDom}
				closeFuncCallback={closeFuncCallback}
				innerDomStyle={innerDomStyle}
				innerConstDomStyle={innerConstDomStyle}
				state={state}
				setState={setState}
				unmount={unmount}
			>
				{finalRender}
				{triangle}
			</Modal>
		</>
	);
}

Popover.defaultProps = {
	directions: "TOP",
	needOutsideClose: true,
};

export default Popover;
