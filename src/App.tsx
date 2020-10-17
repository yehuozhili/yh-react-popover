import React from "react";
import "./App.css";
import Popover from "./components/index";

function App() {
	return (
		<div>
			<div style={{ height: "200px" }}></div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<div>
						<div>
							<Popover
								directions="LT"
								content={
									<div style={{ height: "200px" }}>
										LTcontent
									</div>
								}
							>
								<button>LT</button>
							</Popover>
						</div>
						<div>
							<Popover
								directions="LEFT"
								content={
									<div style={{ height: "200px" }}>
										LEFTcontent
									</div>
								}
							>
								<button>LEFT</button>
							</Popover>
						</div>
						<div>
							<Popover
								directions="LB"
								content={
									<div style={{ height: "200px" }}>
										LBcontent
									</div>
								}
							>
								<button>LB</button>
							</Popover>
						</div>
					</div>
					<div>
						<div
							style={{
								height: "150px",
								width: "150px",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Popover
								directions="TL"
								content={<div>TLcontent</div>}
							>
								<button>TL</button>
							</Popover>
							<Popover
								triangleDomStyle={{ background: "blue" }}
								modalDomStyle={{
									background: "blue",
									color: "white",
								}}
								content={<div>TOPcontent</div>}
							>
								<button>TOP</button>
							</Popover>
							<Popover
								directions="TR"
								content={<div>TRcontent</div>}
							>
								<button>TR</button>
							</Popover>
						</div>
						<div>
							<Popover
								directions="BL"
								content={<div>BLcontent</div>}
							>
								<button>BL</button>
							</Popover>
							<Popover
								directions="BOTTOM"
								content={<div>BOTTOMcontent</div>}
							>
								<button>BOTTOM</button>
							</Popover>
							<Popover
								directions="BR"
								content={<div>BRcontent</div>}
							>
								<button>BR</button>
							</Popover>
						</div>
					</div>
					<div>
						<div>
							<Popover
								directions="RT"
								needOutsideClose={false} //组件外不关闭
								content={<div>RTcontent</div>}
							>
								<button>RT</button>
							</Popover>
						</div>
						<div>
							<Popover
								directions="RIGHT"
								content={<div>RIGHTcontent</div>}
							>
								<button>RIGHT</button>
							</Popover>
						</div>
						<div>
							<Popover
								directions="RB"
								content={<div>RBcontent</div>}
							>
								<button>RB</button>
							</Popover>
						</div>
					</div>
				</div>
			</div>
			<div style={{ height: "1200px" }}></div>
		</div>
	);
}

export default App;
