import React from "react";
import {getIcon,FontAwesomeIcon} from "../icons"




export default function Slider() {

	const rootNode = (<div className="Slider">

			
			<div className="slides">
				<div className="slide">
					<div style={{backgroundImage:"url(https://adsl.tci.ir/panel/assets/images/slider/login/slides1.jpg)"}} alt=" slide 1" >
						
					</div>
				</div>
				<div className="slide">
					<div style={{backgroundImage:"url(https://adsl.tci.ir/panel/assets/images/slider/login/slides2.jpg)"}} alt=" slide 2" >
						
					</div>
				</div>
				<div className="slide">
					<div style={{backgroundImage:"url(https://adsl.tci.ir/panel/assets/images/slider/login/slides3.jpg)"}} alt=" slide 3" >
						
					</div>
				</div>
			</div>

			<div className="slide-controller">
				<div className="go-btns">
					<button className="go-right">
						<FontAwesomeIcon icon={getIcon("angle-right")} />
					</button>
					<button className="go-left">
						<FontAwesomeIcon icon={getIcon("angle-left")} />
					</button>
				</div>

			</div>

		</div>
);


	return (
		rootNode
	)

} 

