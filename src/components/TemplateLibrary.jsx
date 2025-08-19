import React, { useEffect } from "react";
import { useTemplates } from "../api/useTemplates";

const TemplateLibrary = ({ onLoad, currentTemplate }) => {
  const { templates, loading, error, fetchTemplates, save } = useTemplates();

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return (
    <aside className="template-library">
      <h3>Template Library</h3>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        onClick={() => save(currentTemplate)}
        disabled={!currentTemplate}
        style={{ marginBottom: 12 }}
      >
        Save Current Design as Template
      </button>
      <ul>
        {templates.map((template) => (
          <li key={template.id || template.name}>
            <button onClick={() => onLoad(template)}>
              Load: {template.name || template.id}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TemplateLibrary;
