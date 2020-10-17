## yh-react-popover

![build](https://github.com/yehuozhili/yh-react-popover/workflows/build/badge.svg?branch=main)

popover 气泡弹窗组件

预览地址：https://yehuozhili.github.io/yh-react-popover/

### 简介

-   由于我在开发 h5dooring 时发现 antd 的 popover 会闪烁位移，而且给定宽高也不能解决此问题，所以直接自己实现个 popover。最终成功替换了 antd 的 popover 解决了此问题。

-   目前写的这个 popover 只支持 click，有别的需要以后再说。

### 快速上手

-   需求 react 与 react-dom 大于 16.8 即可

```
npm i  yh-react-popover
```

-   只需要传 content 为弹窗内容即可工作,direction 默认为 top

-   popover 包裹元素不需要绑事件。

```
import Popover from 'yh-react-popover'
```

```tsx
<Popover directions="TR" content={<div>TRcontent</div>}>
	<button>TR</button>
</Popover>
```

### api

```tsx
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
```

-   里面绑定的 div 是 inline-block，想修改样式只要用 innerConstDomStyle 与 constDomStyle 把 display 改为 block 即可。

-   callback 的强制刷新可以用 useState 存起来，在监听事件比如 scroll 中进行调用。
