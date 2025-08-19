import React from "react";
import { useBuilder } from "../context/BuilderContext";

const PreviewPanel = ({ children }) => {
   const { state, dispatch } = useBuilder();
   const { mode, device } = state;

   const handleToggle = () => {
	   dispatch({ type: "SET_MODE", payload: mode === "edit" ? "preview" : "edit" });
   };

   const handleDevice = (d) => {
	   dispatch({ type: "SET_DEVICE", payload: d });
   };

   // Device frame class
   const frameClass = device ? `device-frame ${device}` : "device-frame desktop";

   return (
	   <div style={{ width: "100%" }}>
		   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
			   <div style={{ display: "flex", gap: 8 }}>
				   <button
					   onClick={() => handleDevice("desktop")}
					   style={{ padding: "7px 16px", borderRadius: 8, background: device === "desktop" ? "#6366f1" : "#e0e7ff", color: device === "desktop" ? "#fff" : "#3730a3", border: 0, fontWeight: 600, cursor: "pointer" }}
				   >
					   Desktop
				   </button>
				   <button
					   onClick={() => handleDevice("tablet")}
					   style={{ padding: "7px 16px", borderRadius: 8, background: device === "tablet" ? "#6366f1" : "#e0e7ff", color: device === "tablet" ? "#fff" : "#3730a3", border: 0, fontWeight: 600, cursor: "pointer" }}
				   >
					   Tablet
				   </button>
				   <button
					   onClick={() => handleDevice("mobile")}
					   style={{ padding: "7px 16px", borderRadius: 8, background: device === "mobile" ? "#6366f1" : "#e0e7ff", color: device === "mobile" ? "#fff" : "#3730a3", border: 0, fontWeight: 600, cursor: "pointer" }}
				   >
					   Mobile
				   </button>
			   </div>
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
