// Custom hook for drag-and-drop logic
import { handleDragStart, allowDrop } from "../utils/dragDrop";

export default function useDragDrop() {
	return { handleDragStart, allowDrop };
}
