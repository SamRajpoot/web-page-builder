import React from "react";
const ButtonElement = ({ content = "Button", style = {}, ...props }) => (
	<button style={{ padding: 12, borderRadius: 8, background: "#6366f1", color: "#fff", fontWeight: 600, ...style }} {...props}>
		{content}
	</button>
);
export default ButtonElement;
