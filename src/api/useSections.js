// React hook for section CRUD operations
import { useState, useCallback } from "react";
import { saveSection, loadSections } from "./index";
import { templates as staticTemplates } from "../data/templates";

export function useSections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSections = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadSections();
      setSections(data);
    } catch (err) {
      // Fallback: use demo templates as sections
      setSections(staticTemplates.map(t => ({ ...t, id: t.name })));
      setError("API unavailable, using demo sections.");
    } finally {
      setLoading(false);
    }
  }, []);

  const save = useCallback(async (section) => {
    setLoading(true);
    setError(null);
    try {
      await saveSection(section);
      await fetchSections();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchSections]);

  return { sections, loading, error, fetchSections, save };
}
