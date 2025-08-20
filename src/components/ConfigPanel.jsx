
import React from "react";
import "../styles.css";
import ConfigPanel from "./ConfigPanel";

const styleFields = [
	{ name: "fontSize", label: "Font Size", type: "number" },
	{ name: "color", label: "Text Color", type: "color" },
	{ name: "backgroundColor", label: "Background", type: "color" },
	{ name: "padding", label: "Padding", type: "number" },
	{ name: "margin", label: "Margin", type: "number" },
	{ name: "textAlign", label: "Text Align", type: "select", options: ["left", "center", "right"] },
	{ name: "border", label: "Border", type: "text" },
	{ name: "borderRadius", label: "Border Radius", type: "number" },
	{ name: "boxShadow", label: "Box Shadow", type: "text" }
];

const devices = ["desktop", "tablet", "mobile"];


const ConfigPanel = ({ selected, onChange }) => {
	if (!selected) return <div className="config-panel-empty">Select an element to configure</div>;

	const handleInput = (e) => {
		const { name, value, type } = e.target;
		onChange({ ...selected, [name]: type === "number" ? Number(value) : value });
	};

	const handleStyle = (e) => {
		const { name, value, type } = e.target;
		onChange({ ...selected, style: { ...selected.style, [name]: type === "number" ? Number(value) : value } });
	};

	const handleVisibility = (device) => {
		const vis = selected.visibility || {};
		onChange({ ...selected, visibility: { ...vis, [device]: !vis[device] } });
	};



	return (
		<aside className="config-panel">
			<h3>Element Settings</h3>
			{selected.type === "text" && (
				<label>
					Text:
					<input name="content" value={selected.content} onChange={handleInput} />
				</label>
			)}
			{selected.type === "button" && (
				<label>
					Button Label:
					<input name="content" value={selected.content} onChange={handleInput} />
				</label>
			)}
			{selected.type === "image" && (
				<label>
					Image URL:
					<input name="content" value={selected.content} onChange={handleInput} />
				</label>
			)}
			{selected.type === "video" && (
				<label>
					Video URL:
					<input name="content" value={selected.content} onChange={handleInput} />
				</label>
			)}
			<div style={{ margin: "12px 0" }}>
				<strong>Responsive Visibility:</strong>
				<div style={{ display: "flex", gap: 8, marginTop: 6 }}>
					{devices.map((d) => (
						<label key={d} style={{ fontSize: 13 }}>
							<input
								type="checkbox"
								checked={selected.visibility?.[d] ?? true}
								onChange={() => handleVisibility(d)}
							/>
							{d && typeof d === 'string' ? (d.charAt(0).toUpperCase() + d.slice(1)) : ''}
						</label>
					))}
				</div>
			</div>
			{styleFields.map((f) => (
				<label key={f.name}>
					{f.label}:
					{f.type === "select" ? (
						<select name={f.name} value={selected.style?.[f.name] || ""} onChange={handleStyle}>
							<option value="">Default</option>
							{f.options.map((opt) => (
								<option key={opt} value={opt}>{opt}</option>
							))}
						</select>
					) : (
						<input
							name={f.name}
							type={f.type}
							value={selected.style?.[f.name] || (f.type === "number" ? 0 : "")}
							onChange={handleStyle}
						/>
					)}
				</label>
			))}
		</aside>
	);
};

export default ConfigPanel;
