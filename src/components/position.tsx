import { CSSProperties } from "react";

export type PopDirections =
	| "TL"
	| "TOP"
	| "TR"
	| "LT"
	| "LEFT"
	| "LB"
	| "BL"
	| "BOTTOM"
	| "BR"
	| "RT"
	| "RIGHT"
	| "RB";

export function switchPosition(
	sign: PopDirections,
	modalrect: DOMRect,
	popconfirmrect: DOMRect,
	scroll: number
): CSSProperties {
	let triangle = 8;
	switch (sign) {
		case "TL":
			return {
				top: popconfirmrect.top + scroll - modalrect.height - triangle,
				left: popconfirmrect.left,
			};
		case "TOP":
			return {
				top: popconfirmrect.top + scroll - modalrect.height - triangle,
				left:
					popconfirmrect.left -
					modalrect.width / 2 +
					popconfirmrect.width / 2,
			};
		case "TR":
			return {
				top: popconfirmrect.top + scroll - modalrect.height - triangle,
				left:
					popconfirmrect.left -
					modalrect.width +
					popconfirmrect.width,
			};
		case "LT":
			return {
				top: popconfirmrect.top + scroll,
				left: popconfirmrect.left - modalrect.width - triangle,
			};
		case "LEFT":
			return {
				top:
					popconfirmrect.top +
					scroll +
					popconfirmrect.height / 2 -
					modalrect.height / 2,
				left: popconfirmrect.left - modalrect.width - triangle,
			};
		case "LB":
			return {
				top:
					popconfirmrect.top +
					scroll +
					popconfirmrect.height -
					modalrect.height,
				left: popconfirmrect.left - modalrect.width - triangle,
			};
		case "BL":
			return {
				top:
					popconfirmrect.top +
					scroll +
					popconfirmrect.height +
					triangle,
				left: popconfirmrect.left,
			};
		case "BOTTOM":
			return {
				top:
					popconfirmrect.top +
					scroll +
					popconfirmrect.height +
					triangle,
				left:
					popconfirmrect.left +
					popconfirmrect.width / 2 -
					modalrect.width / 2,
			};
		case "BR":
			return {
				top:
					popconfirmrect.top +
					scroll +
					popconfirmrect.height +
					triangle,
				left:
					popconfirmrect.left +
					popconfirmrect.width -
					modalrect.width,
			};
		case "RT":
			return {
				top: popconfirmrect.top + scroll,
				left: popconfirmrect.left + popconfirmrect.width + triangle,
			};
		case "RIGHT":
			return {
				top:
					popconfirmrect.top +
					scroll +
					popconfirmrect.height / 2 -
					modalrect.height / 2,
				left: popconfirmrect.left + popconfirmrect.width + triangle,
			};
		case "RB":
			return {
				top:
					popconfirmrect.top +
					scroll +
					popconfirmrect.height -
					modalrect.height,
				left: popconfirmrect.left + popconfirmrect.width + triangle,
			};
		default:
			console.error("you may pass error directions" + sign);
			return {};
	}
}

export function switchTrianglePosition(
	sign: PopDirections,
	modalrect: DOMRect,
	popconfirmrect: DOMRect,
	scroll: number
): CSSProperties {
	let triangle = Math.sqrt(8 * 8 + 8 * 8); //这里应该是8的正方形的对角线
	switch (sign) {
		case "TL":
		case "TOP":
		case "TR":
			return {
				top: popconfirmrect.top + scroll - triangle - 1,
				left: popconfirmrect.left + popconfirmrect.width / 2,
			};
		case "LT":
		case "LEFT":
		case "LB":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height / 2,
				left: popconfirmrect.left - triangle - 1,
			};

		case "BL":
		case "BOTTOM":
		case "BR":
			return {
				top:
					popconfirmrect.top +
					scroll +
					popconfirmrect.height +
					triangle / 2 -
					1,
				left: popconfirmrect.left + popconfirmrect.width / 2,
			};

		case "RT":
		case "RIGHT":
		case "RB":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height / 2,
				left: popconfirmrect.left + popconfirmrect.width + triangle / 2,
			};
		default:
			console.error("you may pass error directions" + sign);
			return {};
	}
}
