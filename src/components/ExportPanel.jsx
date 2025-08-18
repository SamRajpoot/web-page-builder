import React, { useState } from "react";
import { useBuilder } from "../context/BuilderContext";
import { generateHTML, generateEmbedCode } from "../utils/codeGenerator";

const ExportPanel = () => {
  const { state } = useBuilder();
  const [mode, setMode] = useState("html");
  const [copied, setCopied] = useState(false);

  const html = generateHTML(state.elements);
  const embed = generateEmbedCode(state.elements);

  const handleCopy = () => {
    const text = mode === "html" ? html : embed;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div style={{ padding: 24, background: "#f8fafc", borderRadius: 10, minHeight: 320 }}>
      <h2 style={{ color: "#6366f1", marginBottom: 16 }}>Export / Embed</h2>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setMode("html")}
          style={{ marginRight: 8, background: mode === "html" ? "#6366f1" : "#e0e7ff", color: mode === "html" ? "#fff" : "#3730a3", border: "none", borderRadius: 5, padding: "6px 16px", cursor: "pointer" }}
        >
          HTML + CSS
        </button>
        <button
          onClick={() => setMode("embed")}
          style={{ background: mode === "embed" ? "#6366f1" : "#e0e7ff", color: mode === "embed" ? "#fff" : "#3730a3", border: "none", borderRadius: 5, padding: "6px 16px", cursor: "pointer" }}
        >
          Embed Code
        </button>
      </div>
      <textarea
        readOnly
        value={mode === "html" ? html : embed}
        style={{ width: "100%", minHeight: 160, fontFamily: "monospace", fontSize: 14, border: "1.5px solid #e0e7ff", borderRadius: 6, padding: 10, marginBottom: 12, background: "#fff" }}
      />
      <button
        onClick={handleCopy}
        style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 5, padding: "8px 24px", cursor: "pointer", fontWeight: 500 }}
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
};

export default ExportPanel;
