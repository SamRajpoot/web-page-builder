
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
    <div
      style={{
        padding: 28,
        background: "rgba(255,255,255,0.95)",
        borderRadius: 18,
        minHeight: 340,
        boxShadow: "0 4px 24px 0 rgba(80, 112, 255, 0.10)",
        fontFamily: "Inter, Segoe UI, Arial, sans-serif",
        margin: "24px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <h2
        style={{
          color: "#4f46e5",
          marginBottom: 18,
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 0.5,
        }}
      >
        Export / Embed
      </h2>
      <div style={{ marginBottom: 18, display: "flex", gap: 8 }}>
        <button
          onClick={() => setMode("html")}
          style={{
            background: mode === "html" ? "linear-gradient(90deg,#6366f1,#60a5fa)" : "#e0e7ff",
            color: mode === "html" ? "#fff" : "#3730a3",
            border: "none",
            borderRadius: 6,
            padding: "7px 20px",
            cursor: "pointer",
            fontWeight: 500,
            boxShadow: mode === "html" ? "0 2px 8px 0 rgba(99,102,241,0.10)" : "none",
            transition: "all 0.15s",
          }}
        >
          HTML + CSS
        </button>
        <button
          onClick={() => setMode("embed")}
          style={{
            background: mode === "embed" ? "linear-gradient(90deg,#6366f1,#60a5fa)" : "#e0e7ff",
            color: mode === "embed" ? "#fff" : "#3730a3",
            border: "none",
            borderRadius: 6,
            padding: "7px 20px",
            cursor: "pointer",
            fontWeight: 500,
            boxShadow: mode === "embed" ? "0 2px 8px 0 rgba(99,102,241,0.10)" : "none",
            transition: "all 0.15s",
          }}
        >
          Embed Code
        </button>
      </div>
      <textarea
        readOnly
        value={mode === "html" ? html : embed}
        style={{
          width: "100%",
          minHeight: 160,
          fontFamily: "Fira Mono, monospace",
          fontSize: 15,
          border: "1.5px solid #e0e7ff",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          background: "#f9fafb",
          color: "#22223b",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />
      <button
        onClick={handleCopy}
        style={{
          background: "linear-gradient(90deg,#6366f1,#60a5fa)",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "10px 0",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 16,
          boxShadow: "0 2px 8px 0 rgba(99,102,241,0.10)",
          transition: "all 0.15s",
        }}
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
};

export default ExportPanel;
