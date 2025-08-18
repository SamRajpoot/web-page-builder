import React, { useState } from "react";
import "../styles.css";
import { useBuilder } from "../context/BuilderContext";
import SectionElement from "./Elements/SectionElement";
import ColumnElement from "./Elements/ColumnElement";
import { addElementToTree } from "../utils/treeUtils";

const defaultContent = {
	text: "Double-click to edit text",
	button: "Click Me",
	input: "",
	image: "https://placehold.co/120x80",
	video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
	container: "Container",
	tabs: ["Tab 1", "Tab 2"],
	accordion: ["Accordion 1", "Accordion 2"]
};

const Canvas = ({ onSelect, selectedId }) => {
	const { state, dispatch } = useBuilder();
	const elements = state.elements;
	const [editingId, setEditingId] = useState(null);
	const [editValue, setEditValue] = useState("");
	const [dropTarget, setDropTarget] = useState(null);

	// Drop handler for root canvas or any element
	const handleDrop = (e, parentId = null) => {
		e.preventDefault();
		setDropTarget(null);
		const type = e.dataTransfer.getData("elementType");
		const newElement = {
			id: Date.now() + Math.random(),
			type,
			content: JSON.parse(JSON.stringify(defaultContent[type])),
			children: []
		};
		let updated;
		if (parentId) {
			updated = addElementToTree(elements, parentId, newElement);
		} else {
			updated = [...elements, newElement];
		}
		dispatch({ type: "PUSH_HISTORY", payload: updated });
		dispatch({ type: "SET_ELEMENTS", payload: updated });
	};

	const handleDragOver = (e, id = null) => {
		e.preventDefault();
		setDropTarget(id);
	};

	const handleDragLeave = () => setDropTarget(null);

	const handleDoubleClick = (id, content) => {
		setEditingId(id);
		setEditValue(content);
	};

	const handleEditChange = (e) => {
		setEditValue(e.target.value);
	};

	const handleEditBlur = (id) => {
		// Only update content, not children
		const updateTree = (tree) => tree.map(el => {
			if (el.id === id) return { ...el, content: editValue };
			if (el.children) return { ...el, children: updateTree(el.children) };
			return el;
		});
		const updated = updateTree(elements);
		dispatch({ type: "PUSH_HISTORY", payload: updated });
		dispatch({ type: "SET_ELEMENTS", payload: updated });
		setEditingId(null);
		setEditValue("");
	};

	// Recursive renderer for nested elements
		const renderElement = (el) => {
			const isSelected = selectedId === el.id;
		let content = null;
		switch (el.type) {
			case "section":
				content = (
					<SectionElement>
						{el.children && el.children.length > 0
							? el.children.map(child => renderElement(child))
							: <div className="canvas-placeholder">Drop columns or widgets here</div>}
					</SectionElement>
				);
				break;
			case "column":
				content = (
					<ColumnElement>
						{el.children && el.children.length > 0
							? el.children.map(child => renderElement(child))
							: <div className="canvas-placeholder">Drop widgets here</div>}
					</ColumnElement>
				);
				break;
			case "text":
				content = editingId === el.id ? (
					<input
						className="canvas-edit-input"
						value={editValue}
						autoFocus
						onChange={handleEditChange}
						onBlur={() => handleEditBlur(el.id)}
						onKeyDown={e => e.key === "Enter" && handleEditBlur(el.id)}
					/>
				) : (
					<span onDoubleClick={() => handleDoubleClick(el.id, el.content)}>{el.content}</span>
				);
				break;
			case "button":
				content = editingId === el.id ? (
					<input
						className="canvas-edit-input"
						value={editValue}
						autoFocus
						onChange={handleEditChange}
						onBlur={() => handleEditBlur(el.id)}
						onKeyDown={e => e.key === "Enter" && handleEditBlur(el.id)}
					/>
				) : (
					<button onDoubleClick={() => handleDoubleClick(el.id, el.content)}>{el.content}</button>
				);
				break;
			case "input":
				content = <input className="canvas-input" placeholder="Input field" disabled />;
				break;
			case "image":
				content = <img src={el.content} alt="Dropped" className="canvas-img" />;
				break;
			case "video":
				content = (
					<iframe
						className="canvas-video"
						width="200"
						height="120"
						src={el.content}
						title="Video"
						frameBorder="0"
						allowFullScreen
					/>
				);
				break;
			case "container":
				content = <div className="canvas-container">{el.content}</div>;
				break;
			case "tabs":
				content = (
					<div className="canvas-tabs">
						{el.content.map((tab, idx) => (
							<span key={idx} className="canvas-tab">{tab}</span>
						))}
					</div>
				);
				break;
			case "accordion":
				content = (
					<div className="canvas-accordion">
						{el.content.map((acc, idx) => (
							<details key={idx} className="canvas-accordion-item">
								<summary>{acc}</summary>
								<div>Accordion content</div>
							</details>
						))}
					</div>
				);
				break;
			default:
				content = <span>{el.type}</span>;
		}
		// Make section/column droppable
		const isDroppable = el.type === "section" || el.type === "column";
			return (
				<div
					key={el.id}
					className={`canvas-element canvas-${el.type} creative-element${dropTarget === el.id ? " canvas-drop-hover" : ""}${isSelected ? " canvas-selected" : ""}`}
					onDrop={isDroppable ? (e) => handleDrop(e, el.id) : undefined}
					onDragOver={isDroppable ? (e) => handleDragOver(e, el.id) : undefined}
					onDragLeave={isDroppable ? handleDragLeave : undefined}
					onClick={e => { e.stopPropagation(); onSelect && onSelect(el); }}
					style={isSelected ? { outline: '2px solid #6366f1', zIndex: 2 } : {}}
				>
					{content}
				</div>
			);
	};

		return (
			<div
				className="canvas creative-canvas"
				onDrop={(e) => handleDrop(e, null)}
				onDragOver={(e) => handleDragOver(e, null)}
				onDragLeave={handleDragLeave}
				onClick={() => onSelect && onSelect(null)}
			>
				{elements.length === 0 && <div className="canvas-placeholder">✨ Drag elements here to start building!</div>}
				{elements.map((el) => renderElement(el))}
			</div>
		);
};

export default Canvas;
