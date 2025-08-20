import { useBuilder } from "../context/BuilderContext";

export default function useHistory() {
	const { state, dispatch } = useBuilder();
	const canUndo = state.history.past.length > 0;
	const canRedo = state.history.future.length > 0;

	const undo = () => {
		if (canUndo) dispatch({ type: "UNDO" });
	};
	const redo = () => {
		if (canRedo) dispatch({ type: "REDO" });
	};

	return { undo, redo, canUndo, canRedo };
}
