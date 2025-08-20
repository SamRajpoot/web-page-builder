import React, { useEffect } from "react";
import { useSections } from "../api/useSections";

const SectionLibrary = ({ onInsert, currentSection }) => {
  const { sections, loading, error, fetchSections, save } = useSections();

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  return (
    <aside className="section-library">
      <h3>Section Library</h3>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        onClick={() => save(currentSection)}
        disabled={!currentSection}
        style={{ marginBottom: 12 }}
      >
        Save Current Section
      </button>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <button onClick={() => onInsert(section)}>
              Insert: {section.name || section.id}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SectionLibrary;
