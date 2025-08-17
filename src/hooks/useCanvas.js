// Custom hook for canvas logic (selection, drag, etc.)
import { useBuilder } from "../context/BuilderContext";

export default function useCanvas() {
	const { state, dispatch } = useBuilder();
	// Add canvas-specific helpers as needed
	return { state, dispatch };
}
