import React from "react";
const TextElement = ({ content = "Text", style = {}, ...props }) => (
	<span style={{ fontSize: 18, color: "#3730a3", ...style }} {...props}>{content}</span>
);
export default TextElement;
