// Utility to generate HTML, CSS, and embed code from builder elements
export function generateHTML(elements) {
	return elements.map(el => toHtml(el)).join("\n");
}

function toHtml(el) {
	const style = el.style ? styleToString(el.style) : "";
	switch (el.type) {
		case "text":
			return `<div style='${style}'>${el.content}</div>`;
		case "button":
			return `<button style='${style}'>${el.content}</button>`;
		case "input":
			return `<input style='${style}' placeholder='Input field' disabled />`;
		case "image":
			return `<img style='${style}' src='${el.content}' alt='Dropped' />`;
		case "video":
			return `<iframe style='${style}' width='200' height='120' src='${el.content}' frameborder='0' allowfullscreen></iframe>`;
		case "container":
			return `<div class='canvas-container' style='${style}'>${el.content}</div>`;
		case "tabs":
			return `<div class='canvas-tabs' style='${style}'>${el.content.map(tab => `<span class='canvas-tab'>${tab}</span>`).join('')}</div>`;
		case "accordion":
			return `<div class='canvas-accordion' style='${style}'>${el.content.map(acc => `<details class='canvas-accordion-item'><summary>${acc}</summary><div>Accordion content</div></details>`).join('')}</div>`;
		default:
			return `<div style='${style}'>${el.type}</div>`;
	}
}

function styleToString(styleObj) {
	return Object.entries(styleObj)
		.map(([k, v]) => `${camelToKebab(k)}:${v}`)
		.join(';');
}

function camelToKebab(str) {
	return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

export function generateEmbedCode(elements) {
	const html = generateHTML(elements);
	return `<iframe srcdoc="${html.replace(/"/g, '&quot;')}" style="width:100%;height:600px;border:none;"></iframe>`;
}
