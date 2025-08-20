import React, { createContext, useContext, useReducer } from "react";

const initialState = {
	elements: [],
	selected: null,
	history: { past: [], present: [], future: [] },
	mode: "edit", // or "preview"
	device: "desktop" // or "tablet", "mobile"
};

function builderReducer(state, action) {
	switch (action.type) {
		case "SET_ELEMENTS":
			return { ...state, elements: action.payload };
		case "SELECT_ELEMENT":
			return { ...state, selected: action.payload };
		case "SET_MODE":
			return { ...state, mode: action.payload };
		case "SET_DEVICE":
			return { ...state, device: action.payload };
		case "UNDO":
			if (state.history.past.length === 0) return state;
			const previous = state.history.past[state.history.past.length - 1];
			return {
				...state,
				elements: previous,
				history: {
					past: state.history.past.slice(0, -1),
					present: previous,
					future: [state.elements, ...state.history.future]
				}
			};
		case "REDO":
			if (state.history.future.length === 0) return state;
			const next = state.history.future[0];
			return {
				...state,
				elements: next,
				history: {
					past: [...state.history.past, state.elements],
					present: next,
					future: state.history.future.slice(1)
				}
			};
		case "PUSH_HISTORY":
			return {
				...state,
				history: {
					past: [...state.history.past, state.elements],
					present: action.payload,
					future: []
				}
			};
		default:
			return state;
	}
}

const BuilderContext = createContext();

export function BuilderProvider({ children }) {
	const [state, dispatch] = useReducer(builderReducer, initialState);
	return (
		<BuilderContext.Provider value={{ state, dispatch }}>
			{children}
		</BuilderContext.Provider>
	);
}

export function useBuilder() {
	return useContext(BuilderContext);
}
