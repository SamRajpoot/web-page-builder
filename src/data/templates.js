// Example templates and sections for the page builder
export const templates = [
	{
		name: "Hero Section",
		elements: [
			{ type: "container", content: "Hero Container", style: { backgroundColor: "#e0e7ff", padding: 32 } },
			{ type: "text", content: "Welcome to the Web Page Builder!", style: { fontSize: 32, color: "#6366f1" } },
			{ type: "button", content: "Get Started", style: { backgroundColor: "#6366f1", color: "#fff", fontSize: 18, padding: 12 } }
		]
	},
	{
		name: "Features Section",
		elements: [
			{ type: "container", content: "Features Container", style: { backgroundColor: "#fff", padding: 24 } },
			{ type: "text", content: "Our Features", style: { fontSize: 28, color: "#3730a3" } },
			{ type: "text", content: "- Drag & Drop\n- Responsive\n- Export Code", style: { fontSize: 18 } }
		]
	}
];

export function getTemplateByName(name) {
	return templates.find(t => t.name === name);
}
