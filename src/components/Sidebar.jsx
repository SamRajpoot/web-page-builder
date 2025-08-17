import React from "react";
import "../styles.css";


const elements = [
	{ type: "section", label: "Section", icon: "🟦" },
	{ type: "column", label: "Column", icon: "🟩" },
	{ type: "text", label: "Text", icon: "📝" },
	{ type: "image", label: "Image", icon: "🖼️" },
	{ type: "button", label: "Button", icon: "🔘" },
	{ type: "input", label: "Input", icon: "🔤" },
	{ type: "container", label: "Container", icon: "📦" },
	{ type: "video", label: "Video", icon: "🎬" },
	{ type: "tabs", label: "Tabs", icon: "📑" },
	{ type: "accordion", label: "Accordion", icon: "🗂️" }
];

const Sidebar = () => {
	const handleDragStart = (e, type) => {
		e.dataTransfer.setData("elementType", type);
	};

		return (
			<aside className="sidebar creative-sidebar">
				<div className="sidebar-header">
					<span className="sidebar-logo">🌈</span>
					<h2>Page Elements</h2>
				</div>
				<ul className="sidebar-list">
					{elements.map((el) => (
						<li
							key={el.type}
							className="sidebar-item creative-item"
							draggable
							onDragStart={(e) => handleDragStart(e, el.type)}
						>
							<span className="sidebar-icon">{el.icon}</span>
							<span>{el.label}</span>
						</li>
					))}
				</ul>
			</aside>
		);
};

export default Sidebar;
