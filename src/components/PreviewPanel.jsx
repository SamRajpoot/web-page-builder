import React from "react";
import { useBuilder } from "../context/BuilderContext";

const PreviewPanel = ({ children }) => {
	const { state, dispatch } = useBuilder();
	const { mode, device } = state;

	const handleToggle = () => {
		dispatch({ type: "SET_MODE", payload: mode === "edit" ? "preview" : "edit" });
	};

	// Device frame class
	const frameClass = device ? `device-frame ${device}` : "device-frame desktop";

	return (
		<div style={{ width: "100%" }}>
			<div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
				<button onClick={handleToggle} style={{ padding: "8px 18px", borderRadius: 8, background: mode === "edit" ? "#6366f1" : "#818cf8", color: "#fff", border: 0, fontWeight: 600, cursor: "pointer" }}>
					{mode === "edit" ? "Preview" : "Edit"} Mode
				</button>
			</div>
			{mode === "preview" ? (
				<div className={frameClass}>
					{children}
				</div>
			) : (
				<div style={{ border: "2px solid #e0e7ff", borderRadius: 12, background: "#fff", minHeight: 400, padding: 24 }}>
					{children}
				</div>
			)}
		</div>
	);
};

export default PreviewPanel;
