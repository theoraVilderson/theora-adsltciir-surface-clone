import React, { useState } from "react";

export default function UnderLineButton({
	underLine = true,
	active = false,
	style = {},
	text = "",
	onClick = () => {},
	href = "#",
} = {}) {
	const [buttonActive] = useState(active);
	return (
		<a
			href={href}
			onClick={onClick}
			style={style}
			className={
				"underLineButton" +
				((underLine && " underLine") || "") +
				(buttonActive ? " active" : "")
			}
		>
			{text}
		</a>
	);
}
