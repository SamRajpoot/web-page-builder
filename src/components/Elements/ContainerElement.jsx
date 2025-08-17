import React from "react";
const ContainerElement = ({ children, style = {}, ...props }) => {
	const isGrid = style.display === "grid" || style.grid || style.gridTemplateColumns;
	const gridStyles = isGrid
		? {
				display: "grid",
				gridTemplateColumns: style.gridTemplateColumns || "repeat(2, 1fr)",
				gap: style.gap || 16,
			}
		: {};
	return (
		<div
			style={{
				padding: 20,
				background: "#e0e7ff",
				borderRadius: 10,
				...style,
				...gridStyles,
			}}
			{...props}
		>
			{children}
		</div>
	);
};
export default ContainerElement;
