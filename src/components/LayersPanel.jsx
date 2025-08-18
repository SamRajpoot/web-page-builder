import React, { useRef } from "react";
import { useBuilder } from "../context/BuilderContext";

import { reorderTree } from "../utils/treeReorder";


const LayersPanel = () => {
	const { state, dispatch } = useBuilder();
	const elements = state.elements;
	const selected = state.selected;
	const dragIdx = useRef(null);

	const handleSelect = (el) => dispatch({ type: "SELECT_ELEMENT", payload: el });
	const handleDragStart = (idx) => { dragIdx.current = idx; };
	const handleDrop = (idx) => {
		if (dragIdx.current === null || dragIdx.current === idx) return;
		const reordered = reorderTree(elements, dragIdx.current, idx);
		dispatch({ type: "PUSH_HISTORY", payload: reordered });
		dispatch({ type: "SET_ELEMENTS", payload: reordered });
		dragIdx.current = null;
	};
	const handleDragOver = (e) => e.preventDefault();

	return (
		<aside className="layers-panel" style={{ width: 220, background: "#f8fafc", borderRight: "1.5px solid #e0e7ff", padding: 16 }}>
			<h3 style={{ margin: "0 0 12px 0", color: "#6366f1" }}>Layers</h3>
			<ul style={{ listStyle: "none", padding: 0 }}>
				{elements.map((el, idx) => (
					<li
						key={el.id}
						draggable
						onDragStart={() => handleDragStart(idx)}
						onDrop={() => handleDrop(idx)}
						onDragOver={handleDragOver}
						onClick={() => handleSelect(el)}
						style={{
							padding: "8px 12px",
							marginBottom: 6,
							borderRadius: 6,
							background: selected && selected.id === el.id ? "#6366f1" : "#fff",
							color: selected && selected.id === el.id ? "#fff" : "#3730a3",
							cursor: "pointer",
							fontWeight: 500,
							border: selected && selected.id === el.id ? "2px solid #818cf8" : "1.5px solid #e0e7ff"
						}}
					>
						{el.type.charAt(0).toUpperCase() + el.type.slice(1)}
					</li>
				))}
			</ul>
		</aside>
	);
};

export default LayersPanel;
