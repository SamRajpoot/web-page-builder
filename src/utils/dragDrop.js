// Drag and drop utility functions for the builder
export function handleDragStart(e, type) {
	e.dataTransfer.setData("elementType", type);
}

export function allowDrop(e) {
	e.preventDefault();
}
